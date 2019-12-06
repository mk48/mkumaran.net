# Kafka - One producer, Multiple consumer

## Create Admin project

Create a new Admin project, add a button then include below program.

here we will increase the `testTopic` partition to 4

![](admin%20project%20form.png)

```C#
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

Run the Admin project (above program) to increase the number of parition.

## Producer project

Add one list box in form then add the below code

```C#
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

```C#
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

## Run - One producer - One consumer

![](one%20producer%20and%20one%20consumer%20screen.png)

## Run - One producer - Two consumer

![](one%20producer%20-%20two%20consumer.png)

## Run - One producer - Multiple consumer

![](one%20producer%20-%20multiple%20consumer.png)

If we open one more consumer (5th), then the 5th one will not receive any topics.
