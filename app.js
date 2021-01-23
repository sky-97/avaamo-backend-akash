const express = require("express");
const mongoose = require("mongoose");
var MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://akash:akash@cluster0.u0fbv.mongodb.net/Avamoo?retryWrites=true&w=majority";
const cors = require("cors");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
// const Job = require("./models/job")

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
const schedule = require("node-schedule");
const axios = require("axios");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// get all data
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

  getAllData((data) => {
    socket.emit("event", data);
  });

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

// watcher to watch database
const db = mongoose.connection;
db.once("open", () => {
  const jobCollection = db.collection("jobs");
  const changeStream = jobCollection.watch();
  changeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        io.of("").emit("newJob", change.fullDocument);
        break;

      case "update":
        getAllData((data) => {
          io.of("").emit("updateJob", data);
        });
        break;
      case "delete":
        getAllData((data) => {
          io.of("").emit("deleteJob", data);
        });
        break;
    }
  });
});

getAllData((data) => {
  const Job = require("./models/job");

  for (let j = 0; j < data.length; j++) {
    schedule.scheduleJob(
      `*/${data[j].request_interval_seconds} * * * * *`,
      async () => {
        if (data[j].enable) {
          try {
            let resp = await axios.get(`${data[j]["request"].url}`);
            if (resp.status === 200) {
              console.log("sever side good status", data[j].name);
              io.of("").emit("sendGoodStatus", data[j].name);
            }
            var query = { _id: data[j]._id };
            data[j].trigger = false;

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

app.use("/api/jobs", jobsRouter);
app.use("/api/users", usersRouter);



server.listen(9000, () => {
  console.log("Server started");
});
