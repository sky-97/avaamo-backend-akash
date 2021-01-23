const User = require("../models/user");

const addUSer = async (req, res) => {
  try {
    const user = await User.create({
      photoUrl: req.body.photoUrl,
      name: req.body.name,
      label: req.body.label,
      type: req.body.type,
    });
    const a1 = await user.save();
    return res.json({
      success: true,
      message: a1,
    });
  } catch (error) {
    console.log("Error with adding user: ", error);
    return res.json({
      success: false,
      message: "Error with adding user. See server console for more info.",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find();

    return res.json({
      success: true,
      message: user,
    });
  } catch (error) {
    console.log("Error with showing user: ", error);
    return res.json({
      success: false,
      message: "Error with  user. See server console for more info.",
    });
  }
};

module.exports = {
  addUSer,
  getUsers,
};
