---
title: How to use Kafka in NodeJs
date: '2019-12-24'
---

1. Create a folder `KafkaNodeJs`

2. Run `npm init` command from inside the folder and answer the few question like author, license, etc... once done, package.json file will be created in our folder.

3. create a new file `index.js`

we will use [kafkajs](https://github.com/tulios/kafkajs) library.

4. open command prompt and run `npm install kafkajs`

5. open `index.js` file and type below program

```JavaScript
const { Kafka, PartitionAssigners: { roundRobin } } = require("kafkajs");

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "test-consumer-group-1", partitionAssigners: [roundRobin] });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "testTopic", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message.value.toString() + " - from Partition " + partition);
    }
  });
};

run().catch(console.error);

```