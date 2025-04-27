const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const parser = require('../middleware/upload'); // Multer + Cloudinary config

// GET user info
router.get("/:id", userController.getUserInfo);

// PUT update user info
router.put("/:id",parser.single("profileImage"), userController.updateUserInfo);

// GET bookmarks
router.get("/bookmarks/:id", userController.getUserBookmarks);

module.exports = router;
