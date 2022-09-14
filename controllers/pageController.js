exports.getIndexPage = (req, res) => {
  res.render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.render("about", {
    page_name: "about",
  });
};

exports.getCoursesPage = (req, res) => {
  res.render("courses", {
    page_name: "courses",
  });
};

exports.getDashboardPage = (req, res) => {
  res.render("dashboard", {
    page_name: "dashboard",
  });
};

exports.getContactPage = (req, res) => {
  res.render("contact", {
    page_name: "contact",
  });
};

exports.getLoginPage = (req, res) => {
  res.render("login", {
    page_name: "login",
  });
};

exports.getRegisterPage = (req, res) => {
  res.render("register", {
    page_name: "register",
  });
};
