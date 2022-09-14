const express = require("express");
const ejs = require("ejs");
const app = express();

// MIDDLEWARES
app.set("view engine", "ejs");
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index", {
    page_name: "index",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    page_name: "about",
  });
});

app.get("/courses", (req, res) => {
  res.render("courses", {
    page_name: "courses",
  });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    page_name: "dashboard",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    page_name: "contact",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    page_name: "login",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    page_name: "register",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
