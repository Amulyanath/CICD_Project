import React, { useState, useEffect } from "react";
import { getTasks, addTask, toggleTaskCompletion, deleteTask } from "../services/taskService"; 
// ✅ added deleteTask here

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("Work"); // default option

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    await addTask({
      description: newTask,
      priority,
      category,
      completed: false,   // ✅ send completed field
    });
    setNewTask("");
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await toggleTaskCompletion(id);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // refresh list after delete
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="task-container">
      <h2>My Tasks</h2>

      {/* Add Task */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span>
              {task.description} ({task.priority}) [{task.category}]
            </span>
            <button onClick={() => handleToggle(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            {task.completed && (
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
