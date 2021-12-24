---
title: PWA using Blazor
date: '2021-12-25'
---

## Create PWA application

In the create new project screen, select `Blazor WebAssembly App`
![Create new blazor application](create-new-blazor-app.png)

give project name and location
![](project-name-and-location.png)

Select Progressive web application, ASP.NET core hosted option.
![Select PWA option](select-pwa-and-host-asp-core.png)

Once project created it will be like the below
![](blazor-pwa-solution-explorer.png)

Run the application
![Running PWA blazor application](running-pwa-blazor-application.png)

## Create new notification page

add below code into `BlazorPWA\Client\Shared\NavMenu.razor`

```csharp
<div class="nav-item px-3">
    <NavLink class="nav-link" href="notification">
        <span class="oi oi-list-rich" aria-hidden="true"></span> Notification
    </NavLink>
</div>
```

after add that code it should be like below
![Notification href in nav bar added](codewindow-notification-link-in-nav-bar.png)

create new file `Notification.razor` and add simple code like in the below screen.

![notification page code window](notification-page-code-window.png)

run the application and ensure that new page is working
![](new-notification-web-page.png)

Add new file `pushNotifications.js`
![](add-new-push-notification-js-file.png)

add below code to that file `pushNotifications.js`

```js
;(function() {
  // Note: Replace with your own key pair before deploying
  const applicationServerPublicKey = '***Replace****'

  window.blazorPushNotifications = {
    requestSubscription: async () => {
      const worker = await navigator.serviceWorker.getRegistration()
      const existingSubscription = await worker.pushManager.getSubscription()
      if (!existingSubscription) {
        const newSubscription = await subscribe(worker)
        if (newSubscription) {
          return {
            url: newSubscription.endpoint,
            p256dh: arrayBufferToBase64(newSubscription.getKey('p256dh')),
            auth: arrayBufferToBase64(newSubscription.getKey('auth')),
          }
        }
      }
    },
  }

  async function subscribe(worker) {
    try {
      return await worker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerPublicKey,
      })
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        return null
      }
      throw error
    }
  }

  function arrayBufferToBase64(buffer) {
    // https://stackoverflow.com/a/9458996
    var binary = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }
})()
```

link that file in the `index.html`
![Link the pushnotification.js in HTML](link-pushnotification-js-in-html.png)

create `NotificationSubscription.cs` file under `BlazorPWA.Shared` project
![](create-new-notificationsubscription.png)
add below code

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorPWA.Shared
{
    public class NotificationSubscription
    {
        public int NotificationSubscriptionId { get; set; }
        public string UserId { get; set; }
        public string Url { get; set; }
        public string P256dh { get; set; }
        public string Auth { get; set; }
    }
}
```

## Install webpush in server code
