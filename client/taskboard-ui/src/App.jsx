import { useState } from "react";
import "./App.css";
import TaskBoard from "./components/taskboard/TaskBoard";

//  This taskboard component will be used to display the tasks that are fetched from the custom backend server, constructed with node.js and express.js.
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <TaskBoard />
    </>
  );
}

export default App;
