const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      category,
    });
  } catch {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};
