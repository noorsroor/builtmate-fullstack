const express = require("express");
const { addProfessional, getProfessionals, getProfessionalDetails, createProfessional } = require("../controllers/professionalController");
const router = express.Router();
const parser = require('../middleware/upload'); // Multer + Cloudinary config

router.post("/", addProfessional); // Add a new professional test postman
router.post("/create", parser.single("backgroundImage"), createProfessional);
router.get("/", getProfessionals); // Get all professionals
router.get("/:id", getProfessionalDetails); // Get  professional by id

module.exports = router;
