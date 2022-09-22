const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`)
    }

    res.status(400).redirect('/register');
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
          req.session.UserID = user._id;
          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash('error', "Your password is not valid!");
          res.status(200).redirect("/login");
        }
      });
    } else {
      req.flash('error', "Your email is not valid!");
      res.status(200).redirect("/login");
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const users = await User.find({});
  const user = await User.findOne({ _id: req.session.UserID }).populate(
    "courses"
  );
  const categories = await Category.find({});
  const courses = await Course.find({ user: req.session.UserID });

  res.status(200).render("dashboard", {
    page_name: "dashboard",
    users,
    user,
    categories,
    courses,
  });
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({user: req.params.id});
    
    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    })
  }
}