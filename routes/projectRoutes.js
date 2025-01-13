const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middlewares/auth");



router.use(auth);


router.post("/", projectController.create);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);


module.exports = router;