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

const addUsersFromScript = async (req, res) => {
  console.log(req.body.data);
  try {
    for (let i = 0; i < req.body.data.length; i++) {
      const element = req.body.data[i];
      const user = await User.create({
        photoUrl: element.photoUrl,
        name: element.name,
        label: element.label,
        type: element.type,
      });
      const a1 = await user.save();
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
  addUsersFromScript,
};
