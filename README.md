# smart-sheet

Simple web solution to assist the testing of the IOT device development instead of using the cloud service

It's very simple application where we will add the device and send the device data to the smart-sheet to maitain the data in database and provide API to access those data.

# project structure

```
│ docker-compose.yml
│ README.md
|
├───smart-sheet-app
│ │ Dockerfile
│ │ yarn-lock
│ │ package.json
│ │
| ├───node_modules
│ ├───public
│ │ index.html
│ |
│ └───src
│ App.css
│ App.tsx
│ index.tsx
│
├───nginx
│ default.conf
│ Dockerfile
│
└───smart-sheet-service
│ │ Dockerfile
│ │ yarn-lock
│ │ package.json
│ │
| ├───node_modules
│ ├───src
```

## Docker-compose

Using the docker compose to bring up the front ent and back end API server along with the MongoDB, Nginx server as well.

build and run

```
> docker-compose up --build
```

use -d flag for run as background

```
> ./run.sh
```

# eclipse-mosquitto configuration

### Setup and configuration

Follow the steps as per the docker hub document: https://hub.docker.com/_/eclipse-mosquitto

1. Docker full image:

```
docker pull eclipse-mosquitto
```

2. Create volumes:

```
/mosquitto/config
/mosquitto/data
/mosquitto/log
```

3. run the docker

```
> docker run -it -p 1883:1883 -p 9001:9001 -v mosquitto.conf:/mosquitto/config/mosquitto.conf -v /mosquitto/data -v /mosquitto/log eclipse-mosquitto
```
