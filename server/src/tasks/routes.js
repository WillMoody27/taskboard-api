const { Router } = require("express"); // This will import the router from the express library
const controller = require("./controller");

const router = Router();

// GET /users
router.get("/", controller.getTasks); // Get all users.
router.get("/:id", controller.getTasksById); // Get a single user by the ID.

// POST /users
router.post("/", controller.createTasks); // Create new tasks associated with a user.

// PUT /users
router.put("/:id", controller.updateTasks); // Update a task by ID.

// DELETE /users
router.delete("/:id", controller.deleteTasks); // Delete a task by ID.

module.exports = router; // This will export the router so that it can be used in the server.js file.
