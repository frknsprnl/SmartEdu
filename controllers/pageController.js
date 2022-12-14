const nodemailer = require("nodemailer");
const Course = require('../models/Course');
const User = require('../models/User');
require("dotenv").config();

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2).populate('user');
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({role: "student"})
  const totalTeachers = await User.countDocuments({role: "teacher"})
  res.status(200).render("index", {
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getCoursesPage = (req, res) => {
  res.status(200).render("courses", {
    page_name: "courses",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.sendEmail = async (req, res) => {

  try {
    const outputMessage = `
  
    <h1> Mail Details </h1>
  
    <ul>
      <li> Name: ${req.body.name} </li>
      <li> Email: ${req.body.email} </li>
    </ul>
  
    <h1> Message </h1>
    <p> ${req.body.message} </p>
    
    <code>This message is sent from SmartEDU.</code>
    `;
  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "streakswild@gmail.com", // gmail user
        pass: process.env.GMAIL_PASS, // gmail password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"SmartEDU Contact 👻" <streakswild@gmail.com>', // sender address
      to: "frknsprnl@hotmail.com", // list of receivers
      subject: "Smart EDU Contact Form", // Subject line
      html: outputMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    req.flash("success", "We received your message successfully!");
  
    res.status(200).redirect("/contact");
  } catch (err) {
    req.flash('error', `Something happened! ${String(err).slice(0, 100) + '...'}`);
    res.status(200).redirect("/contact");

  }

};
