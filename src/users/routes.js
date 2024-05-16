const { Router } = require("express"); // This will import the router from the express library
const controller = require("./controller");

const router = Router();

// GET /users
router.get("/", controller.getUsers); // Get all users.
router.get("/:id", controller.getUserById); // Get a single user by the ID.

// POST /users
router.post("/", controller.createUser); // Create a new user.

// POST /users/login
router.post("/login", controller.loginUser);

// PUT /users
router.put("/update-password", controller.updateUserPassword);

// DELETE /users
router.delete("/:id", controller.deleteUser); // Add this line

module.exports = router; // This will export the router so that it can be used in the server.js file.
