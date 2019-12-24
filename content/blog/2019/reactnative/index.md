---
title: ReactNative getting started
date: '2019-12-23'
---

## Install Andriod studio
click next
![](open%20andriod%20after%20installed.png)

select custom
select theme

select below options
![](select%20options.png)

set Ram for emulator

next
it will download the components
![](downloading%20components.png)

once done, click finish

![](andriod%20install%20done%20scree.png)
click configure in the above screen and select SDK manager

![](andriod%20sdk%20config.png)

![](andriod%20sdk%20config%20SDK%20tools.png)
click apply

![](sdk%20config%20confirm.png)

select arm-dbt license and accept
select sdk-license again click accept
click next
![](install%20accept%20lic.png)

component will be installed
![](component%20installer.png)
once done, click finish
again we will be back to the component selection screen and click OK.

## Setting Andriod home environment variable

The SDK is installed, by default, at the following location: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
![](set%20andriod%20home%20env%20variable.png)

## Add platformtools to path

The default location for this folder is: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools`
![](add%20platform%20tool%20to%20path%20variable.png)

## Open virtual device

in welcome to andriod studio screen --> configure --> AVD manager

![](start%20andriod%20virtual%20device.png)

# React native

## create project
run below command to create react native project
`npx react-native init <projectname>`

![](react%20native%20init%20project%20created.png)

## Add java path in your project
open `android\gradle.properties` file and add `org.gradle.java.home` config


```
android.useAndroidX=true
android.enableJetifier=true
org.gradle.java.home=C:\\Program Files\\Java\\jdk1.8.0_202
```

## run the project
Ensure that the andriod emulator is running
run below command
`npx react-native run-andriod`
when we run that we will get one more `node` command prompt opened.

finally we can see the running react native in the emulator
![](react%20native%20running%20sample%20prj.png)

Update the `app.js` and save, it will be automatically refreshed in the emulator. 