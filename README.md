# Taskboard API + Frontend UI (Currently Updating)

Taskboard is a RESTful API I crafted to empower users in creating, managing, and deleting tasks stored in the database. Furthermore, it facilitates seamless password updates and encryption through the integration of the Bcrypt npm package. This endeavor served as an immersive exploration into password hashing and tracking using Node.js, while concurrently honing skills in constructing RESTful APIs and leveraging essential JavaScript principles. It encapsulates robust user authentication mechanisms and seamless interaction with relational database using Postgres.

### Tech Stack

- Node.js
- Express.js
- Postgres

## Goal of Project

The goal of this project is to create a simple RESTful api that will allow user to create, manage and delete their task that are stored in the DB.

## Dependencies

- Node.js
- Postgres
- NPM
- Express.js
- pg
- dotenv
- bcrypt (Run `sudo npm install bcrypt`) - This is required to hash the password
- nodemon (Run `sudo npm install nodemon`) - This is required to run the server
- cors (Run `sudo npm install cors`) - This is required to allow CORS
  requests

---

## Running the Server (Backend)

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

Sample Task Requests Object:

```json
[
  {
    "id": 4,
    "user_id": 3,
    "title": "Tasks for user 02",
    "description": "print shipping labels for 200+ orders.",
    "status": 2,
    "created_on": "2024-05-17T06:00:00.000Z"
  }
]
```

### User Enpoints

- GET `/users` - Get all users
- GET `/users/:id` - Get a user by id
- POST `/users` - Create a new user
- PUT `/users/:id` - Update a user by id
- DELETE `/users/:id` - Delete a user by id

Sample GET Requests for User Object:

```json
[
  {
    "id": 3,
    "username": "admin_user02",
    "password": "$2b$10$1iD1mXRiRQ5holmCqmnxfutZp5WyXecUsgazW.A68VJxIrpDt0umy",
    "email": "admin02@example.com",
    "created_on": "2024-05-16T06:00:00.000Z",
    "last_login": "2024-05-16T06:00:00.000Z"
  }
]
```

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

Body:

```bash
curl -X PUT http://localhost:3000/update-password -H "Content-Type: application/json" -d '
{
   "email":"user1@example.com",
   "password":"newpassword1"
}
'
```

Ouput:

```bash
{
    "email": "admin02@example.com",
    "password": "$2b$10$MLOEiVtUyBaBBe3NvCPdWOaKbIEL6XwqScE0Jk.yIuyE6SZdo2q12"
}
```

---

## Client Side Integration using Vite + React.js (Frontend)

The client side of the project is being developed using Vite + React.js. The client side will be integrated with the API to provide a seamless user experience.

### Installation

1. Navigate to the `client` directory

Install Vite using the following command:

```bash
npm create vite@latest taskboard-ui -- --template react
```

Vite Documentation:

- [Vite Documentation](https://vitejs.dev/guide/)

2. Run `npm install` to install all the dependencies will need to be executed in the client directory

3. Run `npm run dev` to start the server to run the client side application on `localhost:3000`

# Components

### Taskboard.jsx:

GOAL(s):

- User Story:

  - As a user, I want to be able to view all the tasks that are stored in the database.
  - As a user, I want to be able to create a new task.
  - As a user, I want to be able to update a task.
  - As a user, I want to be able to delete a task.

This component will contain the main component that will be used to display the tasks. It will display each task located in the relational database tied to a specific user. It will allow the user to create, update, and delete tasks.

Example of CORS Error:
<img src="images/cors_error.png" alt="Cor Error" style="max-width: 1140px; width: 100%; margin: 0 auto; display: block;
">

Fix: Add the following code to the `server.js` file to allow CORS requests and make sure the correct headers and dependencies are installed.

```bash
npm install cors
```

#### server.js [Updated]

- If not already added, add the following code to the `server.js` file to allow CORS requests to be made from the client side for your local development environment.

```bash
// Handle CORS
const cors = require("cors");

// Setup the CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
```

Example of Vite Local Enviornment:

<img src="images/local_dev_env.png" alt="local_env" style="max-width: 600px; width: 100%; margin: 0 auto; display: block;
">

- If successful, you should see the following output in the terminal:

  - The output will display the tasks that are stored in the relational PSQL database.

<img src="images/tasks_api_response.png" alt="local_env" style="max-width: 1140px; width: 100%; margin: 0 auto; display: block;
">

# NOTE: Additional functionality is currently being added to the project.
