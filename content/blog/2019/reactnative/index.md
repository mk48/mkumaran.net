---
title: ReactNative getting started
date: "2019-12-23"
---

## Install Andriod studio

click next
![](open-andriod-after-installed.png)

select custom
select theme

select below options
![](select-options.png)

set Ram for emulator

next
it will download the components
![](downloading-components.png)

once done, click finish

![](andriod-install-done-scree.png)
click configure in the above screen and select SDK manager

![](andriod-sdk-config.png)

![](andriod-sdk-config-SDK-tools.png)
click apply

![](sdk-config-confirm.png)

select arm-dbt license and accept
select sdk-license again click accept
click next
![](install-accept-lic.png)

component will be installed
![](component-installer.png)
once done, click finish
again we will be back to the component selection screen and click OK.

## Setting Andriod home environment variable

The SDK is installed, by default, at the following location: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
![](set-andriod-home-env-variable.png)

## Add platformtools to path

The default location for this folder is: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools`
![](add-platform-tool-to-path-variable.png)

## Open virtual device

in welcome to andriod studio screen --> configure --> AVD manager

![](start-andriod-virtual-device.png)

# React native

## create project

run below command to create react native project
`npx react-native init <projectname>`

![](react-native-init-project-created.png)

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
![](react-native-running-sample-prj.png)

Update the `app.js` and save, it will be automatically refreshed in the emulator.
