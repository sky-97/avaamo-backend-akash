const express = require("express");
const router = express.Router();
const { addUSer, getUsers } = require("../controllers/user");
const User = require("../models/user");

router.get("/", getUsers);
router.post("/", addUSer);

router.get("/:id", async (req, res) => {
  try {
    const job = await User.findById(req.params.id);
    res.json(job);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
