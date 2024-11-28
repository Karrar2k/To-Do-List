import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import SortOptions from "./SortOptions";
import "./../styles/TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [currentEditTask, setCurrentEditTask] = useState(null);
  const [currentTab, setCurrentTab] = useState("Personal");
  const [sortBy, setSortBy] = useState("");
  const [playedAnimations, setPlayedAnimations] = useState(new Map());
  const [tabAlerts, setTabAlerts] = useState({
    Personal: false,
    Work: false,
    Other: false,
  });

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);

    if (task.category !== currentTab) {
      setTabAlerts((prev) => ({ ...prev, [task.category]: true }));
    }

    setFormVisible(false);
  };

  const handleEditTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.name === currentEditTask.name
          ? { ...updatedTask, category: updatedTask.category || task.category }
          : task
      )
    );
    setEditVisible(false);
    setCurrentEditTask(null);
  };

  const handleEditClick = (task) => {
    setCurrentEditTask(task);
    setEditVisible(true);
  };

  const handleMarkDone = (taskName) => {
    setTasks((prev) => prev.filter((task) => task.name !== taskName));
  };

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setSortBy("");
    setTabAlerts((prev) => ({ ...prev, [tab]: false }));
  };

  const markPlayed = (taskName) => {
    setPlayedAnimations((prev) => new Map(prev).set(taskName, true));
  };

  const filteredTasks = tasks.filter((task) => task.category === currentTab);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === "Deadline") {
      return (
        new Date(a.date || "9999-12-31") - new Date(b.date || "9999-12-31")
      );
    }
    return 0;
  });

  return (
    <div className="task-list-container">
      <div className="tabs">
        {["Personal", "Work", "Other"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${currentTab === tab ? "active" : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
            {tabAlerts[tab] && <span className="exclamation">❗</span>}
          </button>
        ))}
      </div>

      <div className="sort-container">
        <p className="sort-title">Sort by:</p>
        <SortOptions onSortChange={handleSortChange} />
      </div>

      <div className="task-list fixed-border">
        {sortedTasks.length === 0 ? (
          <p className="empty-state">No tasks in this category.</p>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem
              key={task.name}
              task={task}
              onMarkDone={() => handleMarkDone(task.name)}
              onEdit={() => handleEditClick(task)}
              hasPlayed={playedAnimations.get(task.name)}
              markPlayed={() => markPlayed(task.name)}
            />
          ))
        )}
      </div>

      <button className="add-task-button" onClick={() => setFormVisible(true)}>
        +
      </button>

      {isFormVisible && (
        <TaskForm
          onAddTask={handleAddTask}
          onClose={() => setFormVisible(false)}
        />
      )}

      {isEditVisible && (
        <TaskForm
          onAddTask={handleEditTask}
          onClose={() => setEditVisible(false)}
          initialTask={currentEditTask}
        />
      )}

      <div className="task-counter">Tasks remaining: {tasks.length}</div>
    </div>
  );
}

export default TaskList;
