const express = require("express");
const mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
// database config
const url =
  "mongodb+srv://akash:akash@cluster0.u0fbv.mongodb.net/Avamoo?retryWrites=true&w=majority";
const cors = require("cors");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");


const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
const schedule = require("node-schedule");
const axios = require("axios");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// get all data from the jobs table
function getAllData(callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Avamoo");  

    dbo
      .collection("jobs")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        callback(result);
        db.close();
      });
  });
}

// socket connection
io.of("").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);
// socket query jobs tabke and emit the data
  getAllData((data) => {
    socket.emit("event", data);
  });
// emit when client disconnects
  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});


const db = mongoose.connection;
db.once("open", () => {
  const jobCollection = db.collection("jobs");
  const changeStream = jobCollection.watch();
  changeStream.on("change", (change) => {
    switch (change.operationType) {
      // if new data is added to a jobs table "newJob" socket is triggered
      case "insert":
        io.of("").emit("newJob", change.fullDocument);
        break;
      // if  data updated in jobs table "updateJob" socket is triggered

      case "update":
        getAllData((data) => {
          io.of("").emit("updateJob", data);
        });
        break;
      // if new data is deletedm "deleteJob" socket is triggered

      case "delete":
        getAllData((data) => {
          io.of("").emit("deleteJob", data);
        });
        break;
    }
  });
});


// to do scheduleJob , we have to get all the data from the jobs table
getAllData((data) => {
  const Job = require("./models/job");

  for (let j = 0; j < data.length; j++) {
    schedule.scheduleJob(
      `*/${data[j].request_interval_seconds} * * * * *`,
      async () => {
        // condition to check if that particular job is paused or unpaused
        if (data[j].enable) {
          try {
            let resp = await axios.get(`${data[j]["request"].url}`);
            if (resp.status === 200) {
              console.log("sever side good status", data[j].name);
              io.of("").emit("sendGoodStatus", data[j].name);
            }
            // if previously the job had error , now ran successfuly then we have to make trigger false
            if(data[j].trigger){
              var query = { _id: data[j]._id };
            data[j].trigger = false;
            }
            //update triggere field

            Job.findOneAndUpdate(
              query,
              data[j],
              { upsert: true },
              function (err, doc) {
                if (err) return console.log("error while adding trigger");
                return console.log("Succesfully saved.");
              }
            );

            console.log(
              `i ran url ${data[j]["request"].url} and got  ${resp.status}`
            );
          } catch (e) {
            // if job ran unsucessfully then we have to show it in fe, by making triggere true
            var query = { _id: data[j]._id };
            data[j].trigger = true;

            Job.findOneAndUpdate(
              query,
              data[j],
              { upsert: true },
              function (err, doc) {
                if (err) return console.log("error while adding trigger");
                return console.log("Succesfully saved.");
              }
            );

            console.log(
              "There has been a problem with your fetch operation: " + e.message
            );
          }
        }
      }
    );
  }
});

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected..");
});

app.use(express.json());
app.use(cors());

const jobsRouter = require("./routers/jobs");
const usersRouter = require("./routers/users")
// if route is http://localhost:9000/api/jobs then triggere jobs router else triggere usersRouter
app.use("/api/jobs", jobsRouter);
app.use("/api/users", usersRouter);



server.listen(9000, () => {
  console.log("Server started");
});
