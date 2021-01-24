const express = require("express");
const router = express.Router();
const { addUSer, getUsers, addUsersFromScript } = require("../controllers/user");
const User = require("../models/user");

router.get("/", getUsers);
router.post("/", addUSer);
router.post('/scripts', addUsersFromScript)

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = router;
