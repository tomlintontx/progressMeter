# Progress Meter

This is a plugin for Sisense that will enable a new chart type called Progress Meter. This chart type is intended to measure how much progress has been made toward a goal. 

![Progress Meter Logo](/ProgressMeter-image.png)

## Installation

Install is quick and easy:

1. Download the repository
1. Upload the ProgressMeter folder to the plugins folder of your Sisense installation
1. Wait for the plugins pod to restart and done!

## Use

- **Metric**: The main number that will be shown in the center of the circle. Will also be used as the numerator when calculating the percent of the circle to fill.
- **Denominator**: The denominator when calculating the percent of the circle to fill.
- **Secondary Value**: The secondary number that displays under the main number.
- **Prefix/Postfix**: Text to be added at the beginning or end of the secondary value. Examples would be something like "Goal: " or " total units" 

## Built On
This plugin was built on Sisense version **L8.2.1** and tested on Sisense Windows version **8.2.4**

## Known Issues
1. Will break the Calendar Heatmap that comes installed with Sisense due to a different D3 version. A ticket has been submitted to Sisense for them to fix.
