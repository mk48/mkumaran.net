---
title: How to use Kafka as a load balancer for a topic
date: '2019-12-23'
---

This is continuation of my Kafka series. Please read my previous article.

## Running multiple Kafka consumer with one producer in C#

To consume a topic from multiple consumer we need to create that much partition for a topic.

for example:
If we need 3 consumers to consume a topic as a load balancer then we have to create minimum 3 partition for that topic.

## Create Admin project to create partition

Create a new Admin project, add a button then include below program.

here we will increase the `testTopic` partition to 4

![](./admin project form.png)

```CS
using Confluent.Kafka;
using Confluent.Kafka.Admin;
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace Admin
{
    public partial class frmAdmin : Form
    {
        const string TOPIC = "testTopic";

        public frmAdmin()
        {
            InitializeComponent();
        }

        private async void cmdCreate_Click(object sender, EventArgs e)
        {
            using (var adminClient = new AdminClientBuilder(new AdminClientConfig { BootstrapServers = "localhost:9092" }).Build())
            {
                try
                {
                    // partition specification
                    PartitionsSpecification ps = new PartitionsSpecification();
                    ps.Topic = TOPIC;
                    ps.IncreaseTo = 4;

                    // add it into a list
                    List<PartitionsSpecification> partitionsSpecifications = new List<PartitionsSpecification>();
                    partitionsSpecifications.Add(ps);

                    await adminClient.CreatePartitionsAsync(partitionsSpecifications);

                    MessageBox.Show("Created");
                }
                catch (CreatePartitionsException er)
                {
                    MessageBox.Show($"An error occured creating topic {er.Results[0].Topic}: {er.Results[0].Error.Reason}");
                }
            }
        }
    }
}
```
We have to run this program only once.  
Run the Admin project (above program) to increase the number of parition.

## Producer project

Add one list box in form then add the below code

```CS
using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Confluent.Kafka;

namespace KafkaProducer
{
    public partial class frmProducer : Form
    {
        const string TOPIC = "testTopic";
        private IProducer<Null, string> pBuilder;

        public frmProducer()
        {
            InitializeComponent();
        }
        
        private async void timer1_Tick(object sender, EventArgs e)
        {
            try
            {
                // instead of sending some value, we send current DateTime as value
                var dr = await pBuilder.ProduceAsync(TOPIC, new Message<Null, string> { Value = DateTime.Now.ToLongTimeString() });

                // once done, add the value into list box
                listBox1.Items.Add($"{dr.Value} - Sent to Partition: {dr.Partition.Value}");

                // make sure the last item in the list box is visible
                listBox1.TopIndex = listBox1.Items.Count - 1;
            }
            catch (ProduceException<Null, string> err)
            {
                MessageBox.Show($"Failed to deliver msg: {err.Error.Reason}");
            }
        }

        private void frmProducer_Load(object sender, EventArgs e)
        {
            ProducerConfig config = new ProducerConfig { BootstrapServers = "localhost:9092" };
            pBuilder = new ProducerBuilder<Null, string>(config).Build();

            timer1.Enabled = true;
        }

        private void frmProducer_FormClosing(object sender, FormClosingEventArgs e)
        {
            timer1.Enabled = false;
            pBuilder.Dispose();
        }
    }
}
```

## Consumer project

same as prodcuer form:- add a list box then add below code

```CS
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using Confluent.Kafka;

namespace KafkaConsumer
{
    public partial class frmConsumer : Form
    {
        CancellationTokenSource cts = new CancellationTokenSource();

        public frmConsumer()
        {
            InitializeComponent();
        }
        
        private void StartListen()
        {
            var conf = new ConsumerConfig
            {
                GroupId = "test-consumer-group",
                BootstrapServers = "localhost:9092",
                AutoOffsetReset = AutoOffsetReset.Earliest
            };

            using (var c = new ConsumerBuilder<Ignore, string>(conf).Build())
            {
                c.Subscribe("testTopic");

                try
                {
                    while (true)
                    {
                        try
                        {
                            var cr = c.Consume(cts.Token);

                            // Adding the consumed values into the UI
                            listBox1.Invoke(new Action(() =>
                            {
                                listBox1.Items.Add($"{cr.Value} - from Partition: {cr.Partition.Value}" );

                                // make sure the last item in the list box is visible
                                listBox1.TopIndex = listBox1.Items.Count - 1;
                            }));
                        }
                        catch (ConsumeException err)
                        {
                            MessageBox.Show($"Error occured: {err.Error.Reason}");
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    // Ensure the consumer leaves the group cleanly and final offsets are committed.
                    c.Close();
                }
            }
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            cts.Cancel();
        }
        
        private async void frmConsumer_Load(object sender, EventArgs e)
        {
            await Task.Run(() => StartListen());
        }
    }
}
```

## Consumer group
1. Consumer group is the logic behind this.
2. If we add a consumer into a group then that will act as a load balancer for that topic.
3. for example: If we have two consumer with same `consumer group ID` then the messages will be spllited to these consumers. 
4. For this, we need our topic must be paritioned. If we want to run 3 consumers as a load balancer then our topic must be partitioned minimum 3. That's what we did with the Admin project in the first step.

## Run - One producer - One consumer
All the messages are consumed by the consumer
![](./one producer and one consumer screen.png)

## Run - One producer - Two consumer
When we open one more producer, It will work as a load balancer. Parition 2 and 3 will be consumed by one consumer, 0 and 1 will be other consumer.
![](./one producer - two consumer.png)

## Run - One producer - Multiple consumer
We created four partition. If we run four consumers then one parition will be consumed by one consumer.
![](./one producer - multiple consumer.png)

If we open one more consumer (5th), then the 5th one will not receive any topics, because the topic doesn't have 5th parition. Our topic is having onely 4 partition so only four consumers can consume at a same time. 
