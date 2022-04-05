---
title: Getting started with Flutter - Installation
date: '2022-04-03'
---

## 1. Install Flutter

* Go to https://flutter.dev/ and download the SDK. 
* It is a zip file. Extract that content into C:\

![Flutter extracted location](flutterExtractedLocation.png)

### 1.1 Update environment variable
add `c:\flutter\bin` into path environment variable.

![Add flutter into environment variable](add-into-env-variable.png)

### 1.2 Ensure that environment variable is set correctly.
go to command prompt and run the below command

```
where flutter dart
```
![Where flutter dart output](where-flutter-dart-output.png)

run `flutter doctor` command
![Flutter doctor output](flutter-doctor-output.png)

## 2. Install andriod studio

download and install [android studio](https://developer.android.com/studio)

![Select android virtual device in install](andriod-install-select-virtual-dev.png)

![Android installation](andriod-installation.png)

once the installation is done, open the andriod studio.

![Click next in the android welcome screen](click-next-in-android-welcome.png)

select standard installation method.
![standard-installation](standard-installation.png)

Select accept in the license agreement
* select `android-sdk-license` and click Accept.
* select `intel-android-extra-license` and click Accept.
* select `android-sdk-preview-license` and click Accept.

![License agreemnt select agree](select-agree.png)

Installation is going on
![android installation going on](installation-is-going.png)

### 2.1 Create virtual device

In the android welcome screen, click `More Actions` and select `Virtual Device Manager`.
If you don't get welcome screen in Andriod studio then close the current project `File --> Close project`. It will close the project and take you to the welcome screen.
![Welcome to android studio screen](open-create-virtual-device.png)

In the Device manager screen click `Create device` button.
![Create device button in Device manager window](click-create-device.png)

Select a phone hardware and click `Next`.
![Select Phone type in virtual device config](select-phone.png)

Here, select phone software (Android OS) by clicking `Download` link near the OS version.
![Select phone OS](select-image-and-download.png)

Selected image(OS) will be installed.
![Selected OS is installed](selected-image-installing.png)

Once the image(OS) installed you can see the `Download` link gone for that name. Which means that image is already downloaded. We can click `Next` button now.
![After OS installed](after-image-installed-click-next.png)

There will be `play` button in the device manager, use that to open the emulator.
![Play button to open the Emulator](select-device-and-run.png)

Emulator will be like below.
![Andriod emulator](android-emu-running.png)

use `flutter doctor` command to see everything is installed.
![flutter doctor command after emulator installed](run-flutter-doctor-after-emu-installed.png)
from the above screen we can see there are two items are missing in the installation/configuration.

### 2.2 cmdline-tools component is missing
from `flutter doctor` we got `cmdline-tools component is missing`. We will install that in this step.

Open android studio. Click `SDK manager` icon.
![SDK manager icon in Android studio](sdk-manager-icon.png)

1. Select `Appearance & Behavior --> System settings --> Andriod SDK`.
2. Select `SDK Tools` tab.
3. Check the `Android SDK Command line Tools`.
4. Click Apply

![Android SDK command line](sdk-command-line-install.png)

Run `flutter doctor` command again to see.
![flutter doctor after Command line tools installed](flutter-doctor-after-command-line-installed.png)
Now the command line tool issue gone. Only the android licnese issue there. We will resove in the next step.

### 2.3 Android licenses not accepted for flutter
Run below command
```
flutter doctor --android-licenses
```
to resolve the android licenses.

Once done run `flutter doctor` again.
![flutter doctor after issues solved](flutter-doctor-after-full.png)

Now we are ready to create flutter app.

## 3. Create flutter app

* Go to a directory where you want to place the flutter application.
* run `flutter create yourAppName`

![flutter create app command](flutter-create-cmd.png)

We have created our app, now we have to open Emulator to run the app.

### 3.1 Open emulator to run
Open andriod studio. If you don't see welcome screen then `File --> Close project` in android to see the welcome screen.

In the welcome screen, click `⋮` then `Virtual Device Manager`.
![Open VDM in welcome screen](open-emulator-to-run.png)

In the device manager click `Play` button to open the Emulator.
![Open emulator from Device manager](start-virtual-device.png)

### 3.2 Run flutter

use `flutter run` command to run the flutter app.
![](running-flutter.png)

## What's next
This is just installation and creating first flutter app tutorial. Thtere is a long way to go. Refer below tutorial.

* [▶ Flutter Course for Beginners – 37-hour Cross Platform App Development Tutorial](https://www.youtube.com/watch?v=VPvVD8t02U8)

* [▶ Flutter Crash Course for Beginners 2021 - Build a Flutter App with Google's Flutter & Dart](https://www.youtube.com/watch?v=x0uinJvhNxI)