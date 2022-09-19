module.exports = (req, res, next) => {
  if (req.session.UserID) {
    return res.redirect("/users/dashboard");
  }
  next();
};
