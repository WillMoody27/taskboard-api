-- Drop the database and tables if they exist
DROP DATABASE IF EXISTS taskdb;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS status;

-- Create the database
CREATE DATABASE taskdb;

-- Connect to the database
\c taskdb;

-- Create the table for users -> Updated to include last_login column (i.e. CURRENT_DATE)
CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Auto-incrementing ID
    username VARCHAR(50) NOT NULL UNIQUE, -- Ensure the username is unique
    password VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    created_on DATE DEFAULT CURRENT_DATE NOT NULL
);

-- Alter to include the unique constraint on email
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE users ALTER COLUMN password TYPE VARCHAR(255);

-- ALTER TABLE users ADD COLUMN created_on DATE DEFAULT CURRENT_DATE;
ALTER TABLE users ADD COLUMN last_login DATE DEFAULT CURRENT_DATE;

-- Insert user data
INSERT INTO users (username, password, email) VALUES 
('user1', 'password1', 'user1@example.com');

-- Create the status table
CREATE TABLE status (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Insert status data
INSERT INTO status (id, name) VALUES 
(1, 'Pending'),
(2, 'In Progress'),
(3, 'Completed');

-- Create the tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status INT NOT NULL,
    created_on DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (status) REFERENCES status(id)
);

-- Alter table to include DELETE CASCADE on user_id - to delete tasks when user is deleted
ALTER TABLE tasks
ADD CONSTRAINT tasks_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;


-- Insert task data into the tasks table
INSERT INTO tasks (user_id, title, description, status) VALUES 
(1, 'Complete Profile', 'Update your profile with additional details', 1);
-- (1, 'Update Profile', 'Update your LinkedIn posts', 2),
-- (1, 'First Post', 'Make your first post in the forum', 3),
-- (2, 'Verify Email', 'Verify your email address by clicking the verification link', 1),
-- (2, 'Join a Group', 'Join a group that interests you', 2),
-- (3, 'Upload Avatar', 'Upload a profile picture', 1),
-- (3, 'Add a Friend', 'Send a friend request to another user', 3),
-- (4, 'Set Privacy', 'Adjust your privacy settings', 1),
-- (4, 'Create a Playlist', 'Create a new music playlist', 2),
-- (5, 'Write a Review', 'Write a review for a recent purchase', 1),
-- (5, 'Attend Webinar', 'Attend the upcoming webinar on site features', 3),
-- (1, 'Follow Topic', 'Follow a topic of interest in the forum', 1),
-- (2, 'Complete Survey', 'Complete the user satisfaction survey', 1),
-- (3, 'Update Bio', 'Add a short bio to your profile', 2),
-- (4, 'Post in Forum', 'Start a new discussion in the forum', 3),
-- (5, 'Daily Check-in', 'Check in daily for a week', 1),
-- (1, 'Invite a Friend', 'Invite a friend to join the platform', 1),
-- (2, 'Submit Feedback', 'Provide feedback on the new features', 2),
-- (3, 'Host Event', 'Host an event for your group', 1),
-- (4, 'Earn Badge', 'Earn the "Contributor" badge', 3),
-- (5, 'Update Settings', 'Update your account settings for security', 1);

-- Create role and grant privileges
CREATE ROLE users WITH LOGIN PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE taskdb TO users;

-- Example queries
-- 1. Determine the number of tasks in the entire DB.
SELECT COUNT(*) FROM tasks;

-- 2. Determine the number of tasks for a specific user and show all the tasks that are status 'Pending'.
SELECT COUNT(*) FROM tasks A 
JOIN users B ON A.user_id = B.id
JOIN status C ON A.status = C.id
WHERE B.username = 'user1' AND C.name = 'Pending';

-- 3. Display the description of all the tasks that are status 'In Progress' for that same user.
SELECT A.description FROM tasks A
JOIN users B ON A.user_id = B.id
JOIN status C ON A.status = C.id
WHERE B.username = 'user1' AND C.name = 'In Progress';

-- 4. Display the status along with all the user details for the user with the username 'user2'.
SELECT B.username, B.email, C.name, A.description FROM users B
JOIN tasks A ON A.user_id = B.id
JOIN status C ON A.status = C.id
WHERE B.username = 'user2';

-- 5. Query the tasks sorted by the date they were created in ascending order for user with the user_id 2.
SELECT * FROM tasks 
WHERE user_id = 2
ORDER BY created_on ASC;

-- 6. Using the LIKE operator, find the query where the title of the task contains the word 'Profile'.
SELECT * FROM tasks
WHERE title LIKE '%Profile%';

-- 7. Return just the user of the task with the title 'Complete Profile'.
SELECT B.username, B.email FROM users B
JOIN tasks A ON A.user_id = B.id
WHERE A.title = 'Complete Profile';
