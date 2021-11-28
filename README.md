# Algae Growth Monitoring 
> Hydro Bot-an algal growth monitoring robot will help to solve the above issue

> The bot is aimed to look after the various parameters that will help in the uniform growth of algae.

> Uniform growth of algae is much needed to use it for beneficial purposes such as bio-fuel, vegan leather etc...

> An application is integrated to view the parameters that is being monitored

## Table of Contents
1. [Summary](#Summary) 
2. [Data monitoring](#Data-monitoring-with-Grafana)
3. [Calibrating](#Calibrating-with-NodeJs)
4. [Installation](#Installation)


## Summary 
Component: Raspberry Pi 3 model + 3D Model planner, PCB board with TSL2561, MAX31865, AtlasScientific, ADS1x15.

<img src = "https://user-images.githubusercontent.com/32799668/75661459-064fa280-5c76-11ea-93fa-31cb0b0f8174.png" width = "200">

## The project is capable of:

- The proposed idea is a bot integrated with various sensors to monitor the equal spread of nutrients contents. These sensors will be attached to the WIFI module and send the data to the cloud database. Then these values have been retrieved in a mobile application..

## How we built it

• We have made a miniature floating bot. This bot will be integrated with various sensors. These sensor values will be sent into the firebase real-time database using the WiFi module. Then these values will be shown in the app. 

• We also plan extend by automate the bot using Machine Planner.
Project structure:

```bash
├── lux.py
├── main.py
├── max31865.py
├── PH_library.py
├── pt100.py
├── README.md
└── Server
    ├── app.js
    ├── public
    │   ├── change.css
    │   ├── checkbox.css
    │   └── img
    │       ├── blue.jpeg
    │       ├── hamk.png
    │       ├── main.png
    │       ├── pre.png
    │       ├── red.jpg
    │       ├── submit.png
    │       ├── success.png
    │       ├── test5.png
    │       ├── warning.png
    │       └── yellow.jpg
    ├── status.txt
    ├── history.txt
    └── views
        ├── home.ejs
        ├── instruction.ejs
        └── partials
            ├── footer.ejs
            └── header.ejs
```

## Data monitoring with Grafana

Python scripts are used to gather information from sensors via GPIO pins and calibrate sensors as well. A multithreaded program is created for this purpose.

Project data flow:

<img src="https://user-images.githubusercontent.com/32799668/76547696-485abe80-6496-11ea-9784-77057ef7f8a1.png" width="700">

Data visualization from Grafana:

<img src="https://user-images.githubusercontent.com/32799668/75659668-0e5a1300-5c73-11ea-803f-8d923514984d.png" width="300">

<img src="https://user-images.githubusercontent.com/32799668/75661910-dce34680-5c76-11ea-8f2f-027852b25724.png" width="300">


## Calibrating with NodeJs 

Project work flow:

<img src="https://user-images.githubusercontent.com/32799668/76545581-b1d8ce00-6492-11ea-9797-1aae42aa3a52.png" width="600">


UI for calibration: 


<img src = "https://user-images.githubusercontent.com/32799668/75660722-c1773c00-5c74-11ea-8f17-6f67436847ad.png" width = "500" >

<img src = "https://user-images.githubusercontent.com/32799668/76548370-4c3b1080-6497-11ea-8411-174cd33a40e3.png" width ="500" >
<img src = "https://user-images.githubusercontent.com/32799668/76548217-10a04680-6497-11ea-9cd3-f1392dcc31a5.png" width="500">


## Installation

``` 
$> sudo git clone ****
$> sudo pip3 install numpy, paho-mqtt, socketIO_client_nexus
$> sudo python3 main.py
$> cd Server 
$> node app.js
``` 
