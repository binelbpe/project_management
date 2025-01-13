const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middlewares/auth");

router.use(auth);

router.post("/", projectController.create);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.patch("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
router.post("/:id/members", projectController.addMember);
router.delete("/:id/members/:userId", projectController.removeMember);
router.patch("/:id/members/:userId/role", projectController.updateMemberRole);
module.exports = router;