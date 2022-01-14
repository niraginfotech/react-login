import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";

const Task = (props) => {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const result = axios.post("http://localhost:5000/api/v1/tasks/fetchtask", {
      user_id: localStorage.getItem("userId"),
    });
    result
      .then((res) => {
        setTasks([...res.data.tasks]);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCreateTask = async () => {
    if (!taskName) {
      alert("Please enter Task Name");
    } else {
      const result = await axios.post(
        "http://localhost:5000/api/v1/tasks/createtask",
        {
          taskname: taskName,
          userId: localStorage.getItem("userId"),
        }
      );
      if (result.status === 201) {
        setTaskName("");
      } else {
        alert("Something went wrong");
      }
    }
  };

  const markTodo = (taskId) => {
    axios.patch(`http://localhost:5000/api/v1/tasks/${taskId}`, {completed: true});
  }

  const removeTodo = (taskId) => {
    axios.delete(`http://localhost:5000/api/v1/tasks/${taskId}`);
  }
  console.log(tasks);
  return (
    <div className="login-form">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Task App</h2>
        <p style={{cursor: 'pointer'}} onClick={() => {
            localStorage.removeItem('userId');
            props.history.push('/');
        }}>Log out</p>
      </div>
      <div style={{ display: "flex" }} className="mb-3">
        <input
          type="text"
          name="taskname"
          className="form-control"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          onClick={handleCreateTask}
          type="button"
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
      <div className="mb-3">
        {tasks.map((task, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{ textDecoration: task.completed ? "line-through" : "" }}
            >
              {task.taskname}
            </span>
            <div>
              <button onClick={() => markTodo(task._id)} variant="outline-success">✓</button>{" "}
              <button
                variant="outline-danger"
                onClick={() => removeTodo(task._id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(Task);
