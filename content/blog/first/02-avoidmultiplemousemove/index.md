---
title: Avoid multiple mouse move events in C#
date: "2019-01-02"
---

in windows/wpf application, mouse move event is triggered multiple time. We will see how to avoid multiple mouse move events. if we want to do some time consuming task in mouse move event, that will affect the performance.

Here we will see how to avoid that using timer. In the below logic, mouse move event will be triggered once the mouse move stopped.

#### XAML

```XML
<Window x:Class="MouseMoveAvoidMultipleEvents.MainWindow" xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" Title="MainWindow" Height="350" Width="525">
    <Border Name="brd" Background="LightBlue" MouseMove="brd_MouseMove" >
    </Border>
</Window>
```

#### C&#35;

```C#
using System;
using System.Timers;
using System.Windows;
using System.Windows.Input;

namespace MouseMoveAvoidMultipleEvents
{
    public partial class MainWindow : Window
    {
        private Timer tmrMouseMoveTrigger;

        public MainWindow()
        {
            InitializeComponent();

            tmrMouseMoveTrigger = new Timer(50);
            tmrMouseMoveTrigger.Elapsed += tmrMouseMoveTrigger_Elapsed;
        }

        void tmrMouseMoveTrigger_Elapsed(object sender, ElapsedEventArgs e)
        {
            System.Diagnostics.Debug.WriteLine("Mouse Move at " + DateTime.Now.Ticks.ToString());
            tmrMouseMoveTrigger.Enabled = false;
        }

        private void brd_MouseMove(object sender, MouseEventArgs e)
        {
            tmrMouseMoveTrigger.Enabled = false;
            tmrMouseMoveTrigger.Enabled = true;
        }
    }
}
```

Change the timer’s interval if based on your needs.
