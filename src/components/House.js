import React from "react";
import "./../styles/House.css";
import TaskList from "./TaskList";

function House() {
  return (
    <div className="house">
      <h1 className="house-title">To-Do List</h1>
      <TaskList />
      <p className="house-credit">
        Created by{" "}
        <a
          href="https://github.com/Karrar2k"
          target="_blank"
          rel="noopener noreferrer"
          className="credit-link"
          title="Visit my GitHub profile!"
        >
          Karrar Almayali
        </a>
      </p>
    </div>
  );
}

export default House;
