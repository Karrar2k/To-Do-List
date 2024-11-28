import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./../styles/TaskForm.css";

function TaskForm({ onAddTask, onClose, initialTask = null }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "Medium",
    deadline: false,
    time: "",
    date: "",
    category: "Personal",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
    setIsVisible(true);
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.deadline && (!task.time || task.time === "")) {
      alert("Please select a valid time for the deadline.");
      return;
    }
    onAddTask(task);
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const generateDates = () => {
    return Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "short",
        }),
      };
    });
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <CSSTransition
        in={isVisible}
        appear
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <form className="task-form" onSubmit={handleSubmit}>
            <h2>{initialTask ? "Edit Task" : "Add a New Task"}</h2>

            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={task.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </div>

            <div className="radio-group-container">
              <label>Priority:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={task.priority === "High"}
                    onChange={handleChange}
                  />
                  High
                </label>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    checked={task.priority === "Medium"}
                    onChange={handleChange}
                  />
                  Medium
                </label>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={task.priority === "Low"}
                    onChange={handleChange}
                  />
                  Low
                </label>
              </div>
            </div>

            <div className="checkbox-container">
              <label>Add Deadline?</label>
              <input
                type="checkbox"
                name="deadline"
                checked={task.deadline}
                onChange={handleChange}
              />
            </div>

            {task.deadline && (
              <div className="deadline-group">
                <label>Time:</label>
                <select name="time" value={task.time} onChange={handleChange}>
                  <option value="">Select Time</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i}:00`}>
                      {i}:00
                    </option>
                  ))}
                </select>

                <label>Date:</label>
                <select name="date" value={task.date} onChange={handleChange}>
                  <option value="">No Date</option>
                  {generateDates().map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="radio-group-container">
              <label>Category:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Personal"
                    checked={task.category === "Personal"}
                    onChange={handleChange}
                  />
                  Personal
                </label>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Work"
                    checked={task.category === "Work"}
                    onChange={handleChange}
                  />
                  Work
                </label>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Other"
                    checked={task.category === "Other"}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>
            </div>

            <div className="form-buttons">
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit">
                {initialTask ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </CSSTransition>
    </div>
  );
}

export default TaskForm;
