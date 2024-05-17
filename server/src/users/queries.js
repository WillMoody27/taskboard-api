// This will store all sql queries for DB

// GET QUERIES
const getUsersQuery = "SELECT * FROM users";
const getUserByIdQuery = "SELECT * FROM users WHERE id = $1";

const getUserByEmailQuery = "SELECT * FROM users WHERE email = $1";

const createUserQuery = `
  INSERT INTO users (username, password, email, created_on)
  VALUES ($1, $2, $3, DEFAULT)
  RETURNING id
`;

// PUT QUERIES
const updateUserPasswordQuery = `
  UPDATE users
  SET password = $1
  WHERE email = $2
`;

// DELETE QUERIES, with CASCADE to delete all tasks associated with the user
const deleteUserQuery = "DELETE FROM users WHERE id = $1";

module.exports = {
  getUsersQuery,
  getUserByIdQuery,
  createUserQuery,
  getUserByEmailQuery,
  updateUserPasswordQuery,
  deleteUserQuery,
};
