// src/Form.jsx
import React, { useState } from 'react';

const Form = ({ handleSubmit }) => {
  const [task, setTask] = useState('');

  const submitForm = () => {
    if (task.trim()) {
      handleSubmit({ task });
      setTask('');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <label htmlFor="task">Quest:</label>
      <input
        type="text"
        id="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Quest</button>
    </form>
  );
};

export default Form;
