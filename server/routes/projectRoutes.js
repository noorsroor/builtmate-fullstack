const express = require('express');
const router = express.Router();
const parser = require('../middleware/upload'); // Multer + Cloudinary config
const { createProject, getAllProjects, getProjectById } = require('../controllers/projectController');

// POST a new project
router.post('/projects', parser.array('images', 12), createProject); // Max 5 images

//get all projects 
router.get("/projects", getAllProjects); // GET /api/projects

//get project details by id 
router.get("/projects/:id", getProjectById);

module.exports = router;
