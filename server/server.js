const express = require("express");
const userRoutes = require("./src/users/routes"); // This will import the userRoutes from the users/routes file.
const taskRoutes = require("./src/tasks/routes"); // This will import the taskRoutes from the tasks/routes file.
const app = express();
const port = 3000;

// Handle CORS
const cors = require("cors");

// Setup the CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// use the middleware to inlcude the be able to parse JSON data
app.use(express.json());

// Create user router to access all the users
app.use("/api/v1/users", (req, res, next) => {
  userRoutes(req, res, next); // This will use the userRoutes to access the users.
});

// Create task router to access all the tasks
app.use("/api/v1/tasks", (req, res, next) => {
  taskRoutes(req, res, next); // This will use the taskRoutes to access the tasks.
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
