const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.UserID, (err, user) => {
    if (err || !user) {
      return res.redirect("/login");
    }
    next();
  });
};
