import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "./api";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.title) return;
    await createTask({ ...newTask, status: "TODO" });
    setNewTask({ title: "", description: "" });
    loadTasks();
  };

  const handleMoveTask = async (task, newStatus) => {
    await updateTaskStatus(task.id, newStatus);
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
        <div key={status} style={{ width: "30%", border: "1px solid gray", padding: "10px" }}>
          <h3>{status.replace("_", " ")}</h3>
          {tasks.filter((task) => task.status === status).map((task) => (
            <div key={task.id} style={{ background: "#f4f4f4", padding: "10px", margin: "5px" }}>
              <h4 style={{fontSize: "20px"}}>{task.title}</h4>
              <p style={{fontSize: "20px"}}>{task.description}</p>
              {status !== "TODO" && <button style={{fontSize: "20px"}} onClick={() => handleMoveTask(task, "TODO")}>←</button>}
              {status !== "DONE" && <button style={{fontSize: "20px"}} onClick={() => handleMoveTask(task, "IN_PROGRESS")}>→</button>}
              {status === "IN_PROGRESS" && <button style={{fontSize: "20px"}} onClick={() => handleMoveTask(task, "DONE")}>✔</button>}
              <button style={{fontSize: "20px"}} onClick={() => handleDeleteTask(task.id)}>❌</button>
            </div>
          ))}
        </div>
      ))}
      <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)" }}>
        <input 
          style={{fontSize: "20px"}}
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          style={{fontSize: "20px"}}
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button style={{fontSize: "20px"}} onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default KanbanBoard;