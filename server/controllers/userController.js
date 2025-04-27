const User = require("../models/UserModel");
const Bookmark = require("../models/Bookmark");
const Professional = require("../models/Professional");
const Project = require("../models/ProjectModel");
const cloudinary = require("../utils/cloudinary");

//🟥 get user data 
exports.getUserInfo = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "User fetch failed", error: err });
    }
  };
  
//🟥 update user info
  exports.updateUserInfo = async (req, res) => {
    try {
      const { firstname, lastname, phone, address } = req.body;
      let profilePicture;
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        profilePicture = result.secure_url;
      }
  
      const updateData = { firstname, lastname, phone, address };
      if (profilePicture) updateData.profilePicture = profilePicture;
  
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
      }).select("-password");
  
      return res.status(200).json(updatedUser); // ✅ Use return here
  
    } catch (err) {
      console.error("Update failed:", err);
      return res.status(500).json({ message: "Update failed", error: err }); // ✅ Use return here too
    }
  };
  
//🟥 get all users bookmarks
  exports.getUserBookmarks = async (req, res) => {
    try {
      const bookmark = await Bookmark.findOne({ user: req.params.id })
        .populate("professionals")
        .populate("projects");
      res.status(200).json(bookmark);
    } catch (err) {
      res.status(500).json({ message: "Bookmarks fetch failed", error: err });
    }
  };