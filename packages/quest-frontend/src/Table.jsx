import React from "react";

// API Prefix for your backend
const API_PREFIX = "http://localhost:5000";

const Table = ({ characterData, setCharacterData }) => {
  // Group tasks by date
  const groupedTasks = characterData.reduce((acc, task) => {
    acc[task.date] = acc[task.date] || [];
    acc[task.date].push(task);
    return acc;
  }, {});

  // Function to remove task from the table (Frontend and Backend)
  const removeCharacter = (taskId) => {
    // Make a DELETE request to the backend to remove the task
    fetch(`${API_PREFIX}/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Update the characterData state
        setCharacterData((prevData) =>
          prevData.filter((task) => task._id !== taskId),
        );
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div>
      {Object.keys(groupedTasks).map((date) => (
        <div key={date}>
          <h3>{date}</h3>
          <table>
            <thead>
              <tr>
                <th>Quests</th>
                <th>XP</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedTasks[date].map((task) => (
                <tr key={task._id}>
                  <td>{task.task}</td>
                  <td>{task.xp}</td>
                  <td>
                    <button onClick={() => removeCharacter(task._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Table;
