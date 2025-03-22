const express = require('express');
const { register, login, logout, getUser } = require( '../controllers/authController.js');
const { verifyToken } = require( '../middleware/authMiddleware.js');
const { body } = require( 'express-validator');

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  register
);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", verifyToken, getUser);

module.exports= router;
