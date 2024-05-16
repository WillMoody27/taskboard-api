// import the pool module from db.js
const pool = require("../../db"); // import the pool to use the DB connection
const queries = require("./queries"); // import the queries to use SQL queries
const bcrypt = require("bcrypt"); // import bcrypt to hash the password

// Get all the users in the DB
const getUsers = (req, res) => {
  pool.query(queries.getUsersQuery, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Get the user by ID
const getUserById = (req, res) => {
  pool.query(queries.getUserByIdQuery, [req.params.id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Create a new user
const createUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the user exists first
    const userResult = await pool.query(queries.getUserByEmailQuery, [email]);
    if (userResult.rows.length > 0) {
      return res.status(409).send(`User with email: ${email} already exists.`);
    }

    // TODO: Hash the password before storing it in the DB using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const insertResult = await pool.query(queries.createUserQuery, [
      username,
      hashedPassword,
      email,
    ]);

    res.status(201).send(`User added with ID: ${insertResult.rows[0].id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

// Some Login logic
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const userResult = await pool.query(queries.getUserByEmailQuery, [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    const user = userResult.rows[0];

    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Invalid email or password");
    }

    // Return success message or user details
    res.status(200).send(`Login successful for user: ${user.username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};

// Update user password
const updateUserPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const userResult = await pool.query(queries.getUserByEmailQuery, [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).send(`User with email: ${email} does not exist.`);
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user password
    await pool.query(queries.updateUserPasswordQuery, [hashedPassword, email]);

    res.status(200).send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating password");
  }
};

// Delete user and associated tasks
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the user (and cascade delete their tasks)
    const deleteResult = await pool.query(queries.deleteUserQuery, [id]);
    if (deleteResult.rowCount === 0) {
      return res.status(404).send(`User with ID: ${id} not found.`);
    }
    res
      .status(200)
      .send(`User with ID: ${id} and their tasks deleted successfully.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUserPassword,
  deleteUser,
};
