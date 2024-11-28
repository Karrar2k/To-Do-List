import React from "react";

function SortOptions({ onSortChange }) {
  return (
    <div className="sort-options">
      <label>
        <input
          type="radio"
          name="sort"
          onChange={() => onSortChange("Priority")}
        />
        Priority
      </label>

      <label>
        <input
          type="radio"
          name="sort"
          onChange={() => onSortChange("Deadline")}
        />
        Deadline
      </label>
    </div>
  );
}

export default SortOptions;
