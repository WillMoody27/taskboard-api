// Handle API Calls to the Server

// GET /api/v1/tasks
const handleFetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/tasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// DELETE /api/v1/tasks/:id
const handleDeleteTask = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    // Return id if response is empty or not JSON
    try {
      const data = await response.json();
      return data;
    } catch (jsonError) {
      return { id }; // Assuming the task ID is enough to filter it out from the list
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// // POST /api/v1/tasks
const handleCreateTask = async (task) => {};

export { handleFetchTasks, handleDeleteTask };
