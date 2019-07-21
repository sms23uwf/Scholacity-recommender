import React from "react";

const Checkbox = ({ id, label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

export default Checkbox;
