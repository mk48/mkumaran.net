---
title: Hosting Blazor PWA application on IIS
date: '2021-12-30'
---

## Install the .NET Core Hosting Bundle

[Download .NET Core Hosting Bundle](https://dotnet.microsoft.com/permalink/dotnetcore-current-windows-runtime-bundle-installer)

Download and install the bundle
Restart the system.
![Installing .NET Core Hosting Bundle](installing-core-host-bundle.png)

## Publish app

Publish an app means to produce a compiled app that can be hosted by a server

Right click server project then select publish
![Publish menu](publish-menu.png)

select folder option
![Select folder publish option](folder-publish-option.png)

select location then click finish
![Select publish location](select-location.png)

click publish

## Deploy app

Deploy an app means to move the published app to a hosting system.

- copy the publish folder into IIS system's local folder.
  - Here, I am using two different system. one for development and one for hosting. We generated publish folder in the development system and we have to copy that folder into publish's system.

create site in IIS
![Add website menu in IIS](right-click-to-create-site.png)

select publish folder
![Config option for web IIS](website-config-options-iis.png)

Change application pool settings
![Change application pool settings](change-application-pool-settings.png)

In turn windows feature on/off, select all application development options like the below.
![Select all dev options in windows feature on off](select-all-in-app-dev-windowfeature.png)

Change user settings like below screen.
![Change user access settings](change-user-settings-iis.png)

Ensure the test settings works.
![Ensure user access works](ensure-user-access-works.png)

## HTTPS in localhost

Open powershell with administrator (run as admin) and run the below command

```
New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My"
```

![Run command in powershell](powershell-running-command.png)

1. Start --> Run --> mmc
2. File -> Add or Remove Snap-ins -> Certificates -> Add -> Computer account -> Local computer. Click Finish.
3. Expand the `Personal` folder and you will see your `localhost` certificate:
4. Copy the certificate into `Trusted Root Certification Authorities` - Certificates folder.

![Copy localhost certificate](copy-localhost-certificate.png)

Map https in IIS
![](create-https-map-iis.png)

Open the port `8080` and `8081` in windows firewall.
![Open the port](open-port-firewall.png)
Add a new rule `port`, and open `8080` port

now, visit the URL and you can see https in localhost
![](localhost-https.png)
