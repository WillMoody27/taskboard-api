// This will store all sql queries for DB

// GET QUERIES
const getTasksQuery = "SELECT * FROM tasks";
const getTaskByIdQuery = "SELECT * FROM tasks WHERE id = $1";

// POST QUERIES
const createTaskQuery =
  "INSERT INTO tasks (user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING id";

// PUT QUERIES
const updateTaskQuery =
  "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4";

// DELETE QUERIES
const deleteTaskQuery = "DELETE FROM tasks WHERE id = $1";

module.exports = {
  getTasksQuery,
  getTaskByIdQuery,
  createTaskQuery,
  updateTaskQuery,
  deleteTaskQuery,
};
