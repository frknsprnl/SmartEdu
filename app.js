const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const mongoURL = `mongodb+srv://frknsprnl:${process.env.DB_PASS}@cluster0.mo9q5sn.mongodb.net/?retryWrites=true&w=majority`;

// CONNECTION TO DB
mongoose.connect(mongoURL).then(() => {
  console.log("db connected successfully");
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// GLOBAL VARIABLES

global.userIN = null;

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoURL}),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
app.use("*", (req, res, next) => {
  userIN = req.session.UserID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
