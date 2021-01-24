const Job = require("../models/job");
const express = require("express");

  
const addJob = async (req, res) => {
  try {
    const job = await  Job.create({
        status: req.body.status,
        name: req.body.name,
        notifications: req.body.notifications,
        timezone: req.body.timezone,
        request: req.body.request,
        request_interval_seconds: req.body.request_interval_seconds,
        tolerated_failures: req.body.tolerated_failures,
        created: req.body.created,
        // at first updated date gonna be same as created
        updated: req.body.created,
        enable: req.body.enable,
    });
    const a1 = await job.save();
    return res.json({
      success: true,
      message: a1,
    });
  } catch (error) {
    console.log("Error with adding Job: ", error);
    return res.json({
      success: false,
      message: "Error with adding Job. See server console for more info.",
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()

    return res.json({
      success: true,
      message: jobs,
    });
  } catch (error) {
    console.log("Error with fetching jobs: ", error);
    return res.json({
      success: false,
      message:
        "Error with fetching jobs. See server console for more info.",
    });
  }
};

module.exports = {
    addJob,
    getJobs,
};