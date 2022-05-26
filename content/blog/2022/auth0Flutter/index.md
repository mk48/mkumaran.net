---
title: Auth0 with Flutter
date: '2022-05-21'
---

## Setup auth0

![auth0 create application](auth0-create-application.png)

![auth0 name for application](auth0-give-name-for-application.png)

![](auth0-ensure-emailpass-checked.png)

![](auth0-callback-url.png)

## Create flutter app

`flutter create --org net.mkumaran aasaan`

run
`flutter run`

Add below plugins
```
http: ^0.13.4
flutter_appauth: ^4.0.0
flutter_secure_storage: ^5.0.2
```
![](add-flutter-plugin.png)

run `flutter pub get`
![](run-pub-get.png)

### Change min sdk

`android\local.properties`

```
sdk.dir=C:\\Users\\*******\\AppData\\Local\\Android\\sdk
flutter.sdk=C:\\flutter
flutter.buildMode=debug
flutter.versionName=1.0.0
flutter.versionCode=1

flutter.minSdkVersion=21
flutter.targetSdkVersion=29
```

`android\app\build.gradle`

```
defaultConfig {
    // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
    applicationId "net.mkumaran.aasaan"
    minSdkVersion localProperties.getProperty('flutter.minSdkVersion').toInteger()
    targetSdkVersion localProperties.getProperty('flutter.targetSdkVersion').toInteger()
    versionCode flutterVersionCode.toInteger()
    versionName flutterVersionName
    manifestPlaceholders += ['appAuthRedirectScheme': 'net.mkumaran.aasaan']
}
```

![](andriod-allow-clear-http.png)