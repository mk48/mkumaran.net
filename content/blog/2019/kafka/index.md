# installation

## Required software to download
1. [Java runtime environment](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html). We need oracle account to download.
2. [Zookeeper](http://zookeeper.apache.org/releases.html) Extract the content into a folder `C:\kafka\apache-zookeeper-3.5.6`
3. [Kafka](http://kafka.apache.org/downloads.html) Extract into `C:\kafka\kafka_2.12-2.3.1`

## Java SE Runtime Environment 8

click install to start installing
![JRE installation window](JRE%20installation%20window.png)

### Set Java home variable

1. Control panel --> System settings
2. Advanced system settings
3. Environment variables
4. Add new
5. Give variable name as `JAVA_HOME` and vale as the JRE installed location path. By default it will be at `C:\Program Files\Java\jre1.8.0_231`

![](set%20java%20home%20variable.png)

### Set path variable for Java
1. Select path variable
2. Edit
3. Give `%JAVA_HOME%\bin`
![](set%20path%20variable%20for%20java.png)

run `java -version` in command prompt to check the java installation
![](verify%20java%20installation%20from%20command%20prompt.png)

## Apache ZooKeeper

1. Go to folder `C:\kafka\apache-zookeeper-3.5.6\conf`
2. Copy paste the config file `zoo_sample.cfg` as `zoo.cfg`
3. Open `zoo.cfg` file in a text editor then change the `dataDir` value to `C:\kafka\tmp\zookeeper`

![](zookeeper%20change%20dataDir%20location.png)