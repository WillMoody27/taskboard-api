"use client";
import React, { useState, useEffect } from "react";
import "./TaskBoard.css";

// Import API handlers
import { handleFetchTasks, handleDeleteTask } from "../../handlers/api";

const TaskBoard = () => {
  // State to store tasks
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the server
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await handleFetchTasks();
      setTasks(data);
      console.log(data);
    };
    fetchTasks();
  }, []);

  // Delete a task
  const deleteTask = async (id) => {
    await handleDeleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Functional To Create Task (Not Implemented Yet)

  return (
    <section className="taskboard-section">
      <h2 className="taskboard__heading">Task Board API</h2>
      <div className="links-container">
        <a className="portfolio_link" href="https://www.williamhmoody.com/">
          Created by &rarr; William Hellems-Moody
        </a>
        <a
          className="github_repo_link"
          href="https://github.com/WillMoody27/taskboard-api"
        >
          Documentation &rarr; Posted On Github
        </a>
      </div>
      <div className="taskboard-container">
        {tasks.map((task) => (
          <div key={task.id} className="taskboard-cards">
            <span
              type="button"
              className="taskboard-card__button"
              onClick={() => deleteTask(task.id)}
            >
              X
            </span>
            <div className="taskboard-card__container">
              <h3 className="taskboard-card__title">{task.title}</h3>
              <p className="taskboard-card__desc">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskBoard;
