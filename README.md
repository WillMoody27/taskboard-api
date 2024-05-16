# Taskboard API (Currently Updating)

Taskboard is a RESTful API I crafted to empower users in creating, managing, and deleting tasks stored in the database. Furthermore, it facilitates seamless password updates and encryption through the integration of the Bcrypt npm package. This endeavor served as an immersive exploration into password hashing and tracking using Node.js, while concurrently honing skills in constructing RESTful APIs and leveraging essential JavaScript principles. It encapsulates robust user authentication mechanisms and seamless interaction with relational database using Postgres.

### Tech Stack

- Node.js
- Express.js
- Postgres

## Goal of Project

The goal of this project is to create a simple RESTful api that will allow user to create, manage and delete their task that are stored in the DB.

## Installation

Dependencies:

- Node.js
- Postgres
- NPM
- Express.js
- pg
- dotenv
- bcrypt (Run `sudo npm install bcrypt`) - This is required to hash the password

1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Create a `.env` file in the root directory and add the following environment variables:
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_HOST`
   - `DB_PORT`
   - `DB_DATABASE`
4. Run `npm run dev` to start the server

## API Endpoints

### Tasks Enpoints

- GET `/tasks` - Get all tasks
- GET `/tasks/:id` - Get a task by id
- POST `/tasks` - Create a new task
- PUT `/tasks/:id` - Update a task by id
- DELETE `/tasks/:id` - Delete a task by id

### User Enpoints

- GET `/users` - Get all users
- GET `/users/:id` - Get a user by id
- POST `/users` - Create a new user
- PUT `/users/:id` - Update a user by id
- DELETE `/users/:id` - Delete a user by id

## Testing Login Functionality

#### Login User

Can test the login functionality by sending a POST request to /login with the user's email and password in the body. If the provided password matches the stored hashed password, it will return a success message; otherwise, it will return an error.

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '
{
   "email":"user1@example.com",
   "password":"password1"
}
'
```

#### Update Password

Can test the password update functionality by sending a PUT request to /update-password with the user's email and the new password in the body

```bash
curl -X PUT http://localhost:3000/update-password -H "Content-Type: application/json" -d '
{
   "email":"user1@example.com",
   "password":"newpassword1"
}
'
```

---

# NOTE: Additional functionality is currently being added to the project.
