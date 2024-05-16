// import the pool module from db.js
const pool = require("../../db"); // import the pool to use the DB connection
const queriesTask = require("./queries"); // import the queries to use SQL queries
const queriesUsers = require("../users/queries"); // import the queries to use SQL queries

// GET all the tasks in the DB
const getTasks = (req, res) => {
  pool.query(queriesTask.getTasksQuery, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// GET the task by ID
const getTasksById = (req, res) => {
  pool.query(
    queriesTask.getTaskByIdQuery,
    [req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// CREATE a new task
const createTasks = (req, res) => {
  // Check if the user exists first then create the task.
  pool.query(
    queriesUsers.getUserByIdQuery,
    [req.body.user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        return res
          .status(404)
          .send(`User with ID: ${req.body.user_id} does not exist.`);
      }
      // Else create the task as the user exists
      pool.query(
        queriesTask.createTaskQuery,
        [
          req.body.user_id,
          req.body.title,
          req.body.description,
          req.body.status,
        ],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(201).send(`Task added with ID: ${results.rows[0].id}`);
        }
      );
    }
  );
};

// UPDATE a task by ID
const updateTasks = (req, res) => {
  pool.query(
    queriesTask.updateTaskQuery,
    [req.body.title, req.body.description, req.body.status, req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      // Return the full task object that was updated
      pool.query(
        queriesTask.getTaskByIdQuery,
        [req.params.id],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).json(results.rows);
        }
      );
    }
  );
};

// DELETE a task by ID
const deleteTasks = (req, res) => {
  pool.query(queriesTask.deleteTaskQuery, [req.params.id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Task deleted with ID: ${req.params.id}`);
  });
};

module.exports = {
  getTasks,
  getTasksById,
  createTasks,
  updateTasks,
  deleteTasks,
};
