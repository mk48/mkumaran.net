---
title: How to use Apache kafka in C#
date: '2019-12-22'
---

In this article I will explain how to use kafka in C#. Ensure that you already installed kafka for windows else check my previous article [Install Apache Kafka in Windows 10](http://mkumaran.net/2019/kafka)

We are going to use [Confluent Kafka](https://github.com/confluentinc/confluent-kafka-dotnet) library.

## Setting up Projects in visual studio
Create an empty project in .NET
![](./create%20empty%20project.png)

Delete empty project and keep only the solution
![](./delete%20empty%20project.png)

Add new project
![](./add%20new%20project.png)

Create new Kafka producer project
![](./add%20new%20kafkaProducer%20project.png)

![](./created%20kafkaProducer%20project.png)

### Add NuGet packages
Right click project --> Manage NuGet packages

1. search `Confluent.Kafka`
2. select the correct package
3. install

![](./install%20kafka%20nuget%20package.png)

Ensure that `Confluent.Kafka` added as reference
![](./ensure%20kafka%20reference%20added.png)

## Add code
Add a button and include the following code on click event

```CS
using System;
using System.Windows.Forms;
using Confluent.Kafka;

namespace KafkaProducer
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        // Ensure that async is added in the function
        private async void cmdProduce_Click(object sender, EventArgs e)
        {
            var config = new ProducerConfig { BootstrapServers = "localhost:9092" };

            using(var p = new ProducerBuilder<Null, string>(config).Build())
            {
                try
                {
                    var dr = await p.ProduceAsync("testTopic", new Message<Null, string> { Value = "abc" });
                }
                catch (ProduceException<Null, string> err)
                {
                    MessageBox.Show($"Failed to deliver msg: {err.Error.Reason}");
                }
            }
        }
    }
}

```
the above code is more self explanatory. We connect kafka and send `abc` message to `testTopic` topic

## Add new project for Consumer

Right click on solution --> Add --> New Project
![](./new%20project%20for%20consumer.png)

Add a new windows application project and name it `KafkaConsumer`
![](./consumer%20and%20producer%20project%20in%20solution%20exp.png)

We have to add the Confluent package for the consumer project also. 
Add nuget package `Confluent.Kafka` like the KafkaProducer project.

### Add code
Add a list box in form and add below code

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
                                listBox1.Items.Add(cr.Value);
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
1. We need a endless loop for consumer so created a new `Task` in form load.
2. We have separate method `StartListen` for consumer.

There are five main steps in the consumer code.

1. Build the consumer by passing config.
2. Subscribe topic `testTopic` 
3. Create endless loop.
4. Consume the messages. This is blocking statement. The execution waits here untile the cosumer consumes a message. Once we get any message then the execution will move next line.
5. Add the received message into listbox. We are inside a different thread so directly updating UI element is not possible, so we use `Invoke` method to update the UI.

### Run 

Right click kafkaProducer project --> Debug --> Start new instance
![](./start%20new%20instance.png)

now do the same for KafkaConsumer project to run that.

click produce button on producer the message will be added in the consumer application.
![](./running%20producer%20and%20consumer.png)

## Run producer without consumer application
1. Close the consumer application.
2. Click produce button twice in producer application.
3. Now run the consumer again.
4. We can see the consumer will consume the missed messages.

## Add timer in the producer project

Delete command button in the producer project and add a timer control in form design.

Add the below code.

```CS
using System;
using System.Windows.Forms;
using Confluent.Kafka;

namespace KafkaProducer
{
    public partial class frmProducer : Form
    {
        private ProducerConfig config = new ProducerConfig { BootstrapServers = "localhost:9092" };
        private IProducer<Null, string> pBuilder;

        public frmProducer()
        {
            InitializeComponent();
        }
        
        private void timer1_Tick(object sender, EventArgs e)
        {
            try
            {
                // instead of sending some value, we send current DateTime as value
                pBuilder.Produce("testTopic", new Message<Null, string> { Value = DateTime.Now.ToLongTimeString() });
            }
            catch (ProduceException<Null, string> err)
            {
                MessageBox.Show($"Failed to deliver msg: {err.Error.Reason}");
            }
        }

        private void frmProducer_Load(object sender, EventArgs e)
        {
            pBuilder = new ProducerBuilder<Null, string>(config).Build();
        }

        private void frmProducer_FormClosing(object sender, FormClosingEventArgs e)
        {
            pBuilder.Dispose();
        }
    }
}

```
Here we added a timer and producer a message every second.

Now run the consumer and producer.

![](./producer%20with%20timer.png)
