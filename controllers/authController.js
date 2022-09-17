const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION
          res.status(200).send("You are logged in!");
        }
      });
    } else {
      res.status(400).send("Email or password is not valid.");
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};
