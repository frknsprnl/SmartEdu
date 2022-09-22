const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.route("/signup").post([
    body('name').not().isEmpty().withMessage('Please enter your name.'),
    body('email').isEmail().withMessage('Please enter an email.').custom(async (userEmail) => {
        return User.findOne({email: userEmail}).then(user => {
            if (user) {
                return Promise.reject('Email is already exists!')
            }
        })
    }),
    body('password').not().isEmpty().withMessage('Please enter a password.'),
], authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage);
router.route("/:id").delete(authController.deleteUser);

module.exports = router;
