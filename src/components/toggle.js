import React, { useState } from 'react';
import ReactSwitch from 'react-switch';

function ToggleSwitch() {
  const [checked, setChecked] = useState(true);

  const handleChange = val => {
    setChecked(val)
  }

  return (
    <div className="app" style={{textAlign: "center"}}>
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#D0BCFF"
      />
    </div>
  );
}

export default ToggleSwitch;