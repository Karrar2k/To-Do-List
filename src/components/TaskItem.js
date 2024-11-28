import React, { useState, useEffect } from "react";
import "./../styles/TaskItem.css";

const calculateRemainingTime = (dateStr, timeStr) => {
  if (!dateStr) return "(None)";

  const now = new Date();
  const [year, month, day] = dateStr.split("-").map(Number);
  const [deadlineHours, deadlineMinutes] = timeStr
    ? timeStr.split(":").map(Number)
    : [23, 59];

  const deadline = new Date(
    year,
    month - 1,
    day,
    deadlineHours,
    deadlineMinutes
  );

  if (deadline < now) return "(Past Due)";

  const diffMs = deadline - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

  if (diffDays > 0) return `(In ${diffDays} Days & ${diffHours} Hours)`;
  if (diffHours > 0) return `(In ${diffHours} Hours & ${diffMinutes} Minutes)`;
  return `(In ${diffMinutes} Minutes)`;
};

const formatDeadline = (date, time) => {
  if (!date) return "";

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const remainingTime = calculateRemainingTime(date, time);

  return `⏰ ${formattedDate} ${time || "23:59"} ${remainingTime}`;
};

const TaskItem = ({ task, onMarkDone, onEdit, hasPlayed, markPlayed }) => {
  const [typedContent, setTypedContent] = useState({
    name: "",
    description: "",
    priority: "",
    deadline: "",
  });

  const [lineCompletion, setLineCompletion] = useState({
    name: false,
    description: false,
    priority: false,
    deadline: false,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (hasPlayed) {
      setTypedContent({
        name: task.name,
        description: task.description,
        priority: task.priority,
        deadline: formatDeadline(task.date, task.time),
      });
      setLineCompletion({
        name: true,
        description: true,
        priority: true,
        deadline: true,
      });
      return;
    }

    let index = 0;
    const typingSpeed = 50;

    const interval = setInterval(() => {
      setTypedContent({
        name: task.name.slice(0, index),
        description: task.description.slice(0, index),
        priority: task.priority.slice(0, index),
        deadline: formatDeadline(task.date, task.time).slice(0, index),
      });

      if (index === task.name.length) {
        setLineCompletion((prev) => ({ ...prev, name: true }));
      }
      if (index === task.description.length) {
        setLineCompletion((prev) => ({ ...prev, description: true }));
      }
      if (index === task.priority.length) {
        setLineCompletion((prev) => ({ ...prev, priority: true }));
      }
      if (index === formatDeadline(task.date, task.time).length) {
        setLineCompletion((prev) => ({ ...prev, deadline: true }));
      }

      index += 1;

      if (
        index >
        Math.max(
          task.name.length,
          task.description.length,
          task.priority.length,
          formatDeadline(task.date, task.time).length
        )
      ) {
        clearInterval(interval);
        markPlayed();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [task, hasPlayed, markPlayed]);

  const handleDoneClick = () => setShowConfirmation(true);

  const handleConfirmDone = () => {
    onMarkDone();
    setShowConfirmation(false);
  };

  const handleCancel = () => setShowConfirmation(false);

  return (
    <div className="task-item">
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>Are you sure this task is done?</p>
            <button className="confirm-button" onClick={handleConfirmDone}>
              ✅ Yes
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              ❌ No
            </button>
          </div>
        </div>
      )}

      <div className={`task-details ${showConfirmation ? "blurred" : ""}`}>
        <h3 className="task-name">
          {typedContent.name}
          {!lineCompletion.name && <span className="typing-cursor">|</span>}
        </h3>
        <p className="task-description">
          {typedContent.description}
          {!lineCompletion.description && (
            <span className="typing-cursor">|</span>
          )}
        </p>
        <p className="task-priority">
          {lineCompletion.priority ? (
            <span className={`priority-${task.priority.toLowerCase()}`}>
              {task.priority === "High" && "🔥 High"}
              {task.priority === "Medium" && "⚡ Medium"}
              {task.priority === "Low" && "🌿 Low"}
            </span>
          ) : (
            <span>{typedContent.priority}</span>
          )}
        </p>
        <p className="task-deadline">
          {typedContent.deadline}
          {!lineCompletion.deadline && <span className="typing-cursor">|</span>}
        </p>
      </div>

      <span
        className="edit-button"
        onClick={onEdit}
        title="Edit Task"
        role="button"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          cursor: "pointer",
          fontSize: "1.2rem",
        }}
      >
        ✏️
      </span>

      {!showConfirmation && (
        <button className="done-button" onClick={handleDoneClick}>
          Done
        </button>
      )}
    </div>
  );
};

export default TaskItem;
