import React from 'react';

function CheckBox({className, name, value, children, selected, onCheck}) {
  return (
    <label className={className}>
      <input
          name={name}
          type="checkbox"
          value={value}
          checked={selected || false}
          onChange={(e) => onCheck(value, e.target.checked)}
      />
      {children}
    </label>
  );
}
  
export {
  CheckBox,
}