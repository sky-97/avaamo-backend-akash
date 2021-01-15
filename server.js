const express = require("express");
let moment = require("moment");
const bodyParser = require("body-parser");
const db = require("./models");
const schedule = require("node-schedule");
const axios = require("axios");
const app = express();
const Sequelize = require("sequelize");

app.use(bodyParser.json());

app.get("/api/jobs", (req, res) => {
  console.log("i am here");
  return db.Job.findAll()
    .then((contacts) => res.json(contacts))
    .catch((err) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.status(400).send(err);
    });
});

app.post("/api/jobs", (req, res) => {
  console.log(req.body);
  const {
    status,
    name,
    timezone,
    request_interval_seconds,
    created,
    updated,
    tolerated_failures,
    createdAt,
    updatedAt,
  } = req.body;
  const url = req.body.request.url;
  const method = req.body.request.method;
  const phones = req.body.request.notifications;
  const emails = req.body.request.notifications;
  return db.Job.create({
    status,
    name,
    timezone,
    request_interval_seconds,
    created,
    updated,
    tolerated_failures,
    createdAt,
    updatedAt,
    url,
    method,
    phones,
    emails,
  })
    .then((contact) => res.send(contact))
    .catch((err) => {
      console.log(
        "***There was an error creating a contact",
        JSON.stringify(err)
      );
      return res.status(400).send(err);
    });
});

app.delete("/api/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  return db.Job.findByPk(id)
    .then((contact) => contact.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log("***Error deleting contact", JSON.stringify(err));
      res.status(400).send(err);
    });
});

app.put("/api/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  return db.Job.findByPk(id).then((contact) => {
    const {
      status,
      name,
      timezone,
      request_interval_seconds,
      created,
      updated,
      tolerated_failures,
      createdAt,
      updatedAt,
    } = req.body;
    const url = req.body.request.url;
    const method = req.body.request.method;
    const phones = req.body.request.notifications;
    const emails = req.body.request.notifications;
    return contact
      .update({
        status,
        name,
        timezone,
        request_interval_seconds,
        created,
        updated,
        tolerated_failures,
        createdAt,
        updatedAt,
        url,
        method,
        phones,
        emails,
      })
      .then(() => res.send(contact))
      .catch((err) => {
        console.log("***Error updating contact", JSON.stringify(err));
        res.status(400).send(err);
      });
  });
});

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // SQLite only
  storage: "./avaamo.sqlite3",

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

sequelize.query("SELECT * from Jobs").then((results) => {
  for (let i = 0; i < results.length; i++) {
    let array = results[i];
    for (let j = 0; j < array.length; j++) {
      schedule.scheduleJob(
        `*/${array[j].request_interval_seconds} * * * * *`,
        () => {
          let type = array[j].method.toLowerCase();
       let data =   axios.get(`${array[j].url}`).then((response) => {
        console.log(response.status);
      })
      .catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
      });
          console.log(`i ran url ${array[j].url} and got  ${data}`);
        }
      );
    }
  }
});



app.listen(5000, () => {
  console.log("Server is up on port 3000");
});
