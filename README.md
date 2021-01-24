# SCHEDULER 
scheduler is a web application where users can view schedule jobs, update the jobs , create a new job and also delete the job


# Getting Started

## Prerequisites
[Node](https://nodejs.org/en/)

## Built With
 
server - [express.js](https://expressjs.com/)
 
 database - [mongodb](https://www.mongodb.com/)

 ## getting started
after cloning the project in cmd or termianl write

* ``` npm install ```
to install all the dependencies

command to run the project 

*   ```nodemon npm start```

in this project i followed MVC 


        |avaamo-backend-akash
                
                ├── controllers (Controller implements a »Controller pattern, in which all requests are intercepted by controller and dispatched to individual Action Controllers based on the URL requested(that is routing request from Router). )
                
                ├── models (
                    The models directory contain model config files that describe the JSON Schema of Express Gateway entities that are customizable and extensible.
                )

                ├── routers (
                    Routing is the process of taking a URI endpoint (that part of the URI which comes after the base URL) and decomposing it into parameters to determine which module, controller, and action of that controller should receive the reques
                )

                ├── app.js 

                ├── package.json

## descripttion 
This project  contains api endpoints, server side socket and  a job scheduler, with help of socket server will query the "jobs" table and send the data through socket, we are using socket because we need real time data in the frontend, created socket for each db operation type like update delete and insert. A job scheduler will loop the "jobs" table data and hit the endpoint mentioned in the data and get the status as response , if status is 200 then job is successfully and then we emit socket to fe to show the successfully job notification, is its not the we changed the boolean field "triggere" to true, as the data is real time data in fe, if triggere is true then we show "red cross" in fe means job is unsuccessfull. created users table which have "get" and "post" functions.
