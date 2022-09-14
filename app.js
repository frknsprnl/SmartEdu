const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

// MIDDLEWARES
app.set("view engine", "ejs");
app.use(express.static("public"));

// ROUTES
app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
