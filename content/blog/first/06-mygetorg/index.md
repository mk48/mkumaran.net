---
title: Install packages from myget.org in Visual Studio 2015
date: "2019-01-06"
---

By default Visual Studio supports [NuGet](https://www.nuget.org/) package manager. Here we will see how to use [myget.org](https://myget.org/) package manager in Visual Studio.

#### Open Package Manager settings

Tools –> NuGet Package Manager –> Package Manager Settings

![NuGet package manager setting in visual studio menu](.\nugetinvsmenu.jpg)
NuGet package manager setting in visual studio menu

#### Settings screen

![NuGet settings screen in VisualStudio](.\nugetsettingsinvs.jpg)
NuGet settings screen in VisualStudio

1. select package sources
2. add a new package source
3. select the newly added package source
4. give a name
5. add the package URL. Package provider gives this URL.
6. Click OK

#### Open packages for Solution

Tools –> NuGet Package Manager –> Manage NuGet Packages for Solution

select Package
![Change source and package for myget](.\chnage-source-and-package-myget.jpg)
Change source and package for myget

1. Select myget from Package source.
2. We can see the list of available packages in left side.
