# Using kafka in C#

We are going to use [Confluent Kafka](https://github.com/confluentinc/confluent-kafka-dotnet) library

Create an empty project in .NET
![](create%20empty%20project.png)

Delete empty project and keep only the solution
![](delete%20empty%20project.png)

add new project
![](add%20new%20project.png)

Create new Kafka producer project
![](add%20new%20kafkaProducer%20project.png)

![](created%20kafkaProducer%20project.png)

Right click project --> Manage NuGet packages

1. search `Confluent.Kafka`
2. select the correct package
3. install

![](install%20kafka%20nuget%20package.png)

Ensure that `Confluent.Kafka` added as reference
![](ensure%20kafka%20reference%20added.png)

Add a button and include the following code on click event

```C#
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
the above code will connect kafka and send `abc` message to `testTopic` topic

## Add new project for Consumer

Right click on solution --> Add --> New Project
![](new%20project%20for%20consumer.png)

Add a new windows application project and name it `KafkaConsumer`
![](consumer%20and%20producer%20project%20in%20solution%20exp.png)

add nuget package `Confluent.Kafka` like the KafkaProducer project

Add a list box in form and add below code

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

Run 

Right click kafkaProducer project --> Debug --> Start new instance
![](start%20new%20instance.png)

now do the same for KafkaConsumer project to run that.

click produce button on producer the message will be added in the consumer application.
![](running%20producer%20and%20consumer.png)

1. close the consumer
2. click produce button twice in producer application
3. then run the consumer
4. now we can see the consumer will consume the missed messages.