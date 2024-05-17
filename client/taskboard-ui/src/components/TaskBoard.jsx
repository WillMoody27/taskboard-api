"use client";
import React, { useState, useEffect } from "react";

const TaskBoard = () => {
  // Will be used to store the tasks.
  const [tasks, setTasks] = useState([]);

  const handleFetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/tasks");
      const data = await response.json();
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the tasks from the server.
  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <section className="taskboard-section">
      <h2>Task Board</h2>
      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default TaskBoard;
