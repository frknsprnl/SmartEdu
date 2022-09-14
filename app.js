const express = require("express");
const ejs = require("ejs");
const app = express();
const pageRoute = require("./routes/pageRoute");

// MIDDLEWARES
app.set("view engine", "ejs");
app.use(express.static("public"));

// ROUTES
app.use("/", pageRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
