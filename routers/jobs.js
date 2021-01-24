const express = require("express");
const router = express.Router();
const { addJob, getJobs, addJobFromScript } = require("../controllers/jobs");
const Job = require("../models/job");

router.get("/", getJobs);
router.post("/", addJob);
router.post("/scripts", addJobFromScript);
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    (job.status = req.body.status),
      (job.name = req.body.name),
      (job.notifications = req.body.notifications),
      (job.timezone = req.body.timezone),
      (job.request = req.body.request),
      (job.request_interval_seconds = req.body.request_interval_seconds),
      (job.tolerated_failures = req.body.tolerated_failures),
      (job.created = req.body.created),
      (job.updated = req.body.updated),
      (job.enable = req.body.enable);
    console.log(job);
    const a1 = await job.save();
    res.json(a1);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const a1 = await job.remove();
    res.json(a1);
  } catch (err) {
    res.send("Error" + err);
  }
});
module.exports = router;
