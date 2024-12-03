// src/Table.jsx
import React from 'react';

const Table = ({ characterData, removeCharacter }) => {
  const groupedTasks = characterData.reduce((acc, task) => {
    acc[task.date] = acc[task.date] || [];
    acc[task.date].push(task);
    return acc;
  }, {});

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
              {groupedTasks[date].map((task, index) => (
                <tr key={index}>
                  <td>{task.task}</td>
                  <td>{task.xp}</td>
                  <td>
                    <button onClick={() => removeCharacter(index)}>Delete</button>
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
