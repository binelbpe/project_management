const { Project, User, Task } = require("../models");

const projectController = {
  // Create project
  async create(req, res) {
    try {
      const project = await Project.create({
        ...req.body,
        ownerId: req.user.id,
      });
     
      await project.addUser(req.user.id, {
        through: { role: "admin" },
      });

      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all projects for current user
  async getAllProjects(req, res) {
    try {
      const projects = await req.user.getProjects({
        include: [
          {
            model: User,
            as: "users",
            attributes: ["id", "name", "email"],
            through: { attributes: ["role"] },
          },
        ],
      });

      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get project by ID
  async getProjectById(req, res) {
    try {
      const project = await Project.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: "users",
            attributes: ["id", "name", "email"],
            through: { attributes: ["role"] },
          },
          {
            model: Task,
            as: "tasks",
            include: [
              {
                model: User,
                as: "assignee",
                attributes: ["id", "name", "email"],
              },
            ],
          },
        ],
      });

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
 
      const userProject = await project.hasUser(req.user.id);
      if (!userProject) {
        return res.status(403).json({ error: "Access denied" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = projectController;
