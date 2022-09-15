const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

// MIDDLEWARES
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

mongoose.connect("mongodb://localhost/smartedu-db").then(() => {
  console.log("db connected successfully");
});

// ROUTES
app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
