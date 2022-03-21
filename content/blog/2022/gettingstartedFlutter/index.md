---
title: Getting started in Flutter
date: '2022-03-19'
---

## Install Flutter

go to https://flutter.dev/ and download the SDK. It is a zip file.
Extract that content into C:\

![Flutter extracted location](flutterExtractedLocation.png)

add `c:\flutter\bin` into path environment variable.

![Add flutter into environment variable](add-into-env-variable.png)

Ensure that environment variable is set correctly.
go to command prompt and run the below command

```
where flutter dart
```
![Where flutter dart output](where-flutter-dart-output.png)

run `flutter doctor` command
![Flutter doctor output](flutter-doctor-output.png)

## Install andriod studio

download and install [android studio](https://developer.android.com/studio)

![Select android virtual device in install](andriod-install-select-virtual-dev.png)

![Android installation](andriod-installation.png)

once the installation is done, open the andriod studio.

![Click next in the android welcome screen](click-next-in-android-welcome.png)

select standard installation method.
![standard-installation](standard-installation.png)

select accept in the license agreement
![License agreemnt select agree](select-agree.png)

installation is going on
![android installation going on](installation-is-going.png)

### Create virtual device

![](open-create-virtual-device.png)

![](click-create-device.png)

![](select-phone.png)

![](select-image-and-download.png)

Selected image will be installed.
![](selected-image-installing.png)

![](after-image-installed-click-next.png)

![](select-device-and-run.png)

![](android-emu-running.png)

![](run-flutter-doctor-after-emu-installed.png)

![](sdk-manager-icon.png)

![](sdk-command-line-install.png)

![](flutter-doctor-after-command-line-installed.png)

run `flutter doctor --android-licenses` command to resolve the android licenses.

![](flutter-doctor-after-full.png)