const Job = require("../models/job");
const express = require("express");

const addJob = async (req, res) => {
  console.log(req.body);
  try {
    const job = await Job.create({
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
    console.log(error);
    res.status(400);
    res.send(error);
  }
};

const addJobFromScript = async (req, res) => {
  console.log(req.body);
  try {
    for (let i = 0; i < req.body.length; i++) {
      const element = req.body[i];
      const job = await Job.create({
        status: element.status,
        name: element.name,
        notifications: element.notifications,
        timezone: element.timezone,
        request: element.request,
        request_interval_seconds: element.request_interval_seconds,
        tolerated_failures: element.tolerated_failures,
        created: element.created,
        // at first updated date gonna be same as created
        updated: element.created,
        enable: element.enable,
      });
      const a1 = await job.save();
      return res.json({
        success: true,
        message: a1,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error);
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    return res.json({
      success: true,
      message: jobs,
    });
  } catch (error) {
    console.log("Error with fetching jobs: ", error);
    return res.json({
      success: false,
      message: "Error with fetching jobs. See server console for more info.",
    });
  }
};

module.exports = {
  addJob,
  getJobs,
  addJobFromScript
};
