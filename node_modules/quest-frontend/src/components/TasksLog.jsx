import React, { useState } from "react";
import "./TasksLog.css";

const TasksLog = () => {
    const getFormattedDate = (offset = 0) => {
        const date = new Date();
        date.setDate(date.getDate() - offset);
        return date.toDateString(); // e.g., "Sat Nov 30 2024"
    };

    const initialTasks = {
        [getFormattedDate(0)]: [], // Today
        [getFormattedDate(1)]: [], // Yesterday
        [getFormattedDate(2)]: []  // Two days ago
    };

    const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState(
        Object.keys(initialTasks).reduce((acc, day) => {
            acc[day] = ""; // Initialize input values for each day
            return acc;
        }, {})
    );

    const addTask = (day) => {
        if (newTask[day].trim()) {
            setTasks({
                ...tasks,
                [day]: [...tasks[day], { name: newTask[day], completed: false, xp: 5 }]
            });
            setNewTask({ ...newTask, [day]: "" }); // Clear the input for the specific day
        }
    };

    const toggleTaskCompletion = (day, index) => {
        const updatedTasks = [...tasks[day]];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks({ ...tasks, [day]: updatedTasks });
    };

    const deleteTask = (day, index) => {
        const updatedTasks = tasks[day].filter((_, i) => i !== index);
        setTasks({ ...tasks, [day]: updatedTasks });
    };

    const totalXP = Object.values(tasks).reduce((acc, dayTasks) => {
        return (
            acc +
            dayTasks.reduce((dayAcc, task) => {
                return dayAcc + (task.completed ? task.xp : 0);
            }, 0)
        );
    }, 0);

    return (
        <div className="tasks-log">
            <div className="header">
                <h1>Total XP: {totalXP}</h1>
            </div>
            <div className="scroll-container">
                {Object.keys(tasks).map((day) => (
                    <div className="day-column" key={day}>
                        <h3>{day}</h3>
                        <ul>
                            {tasks[day].map((task, index) => (
                                <li
                                    key={index}
                                    className={task.completed ? "completed" : ""}
                                >
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() =>
                                            toggleTaskCompletion(day, index)
                                        }
                                    />
                                    {task.name} - {task.xp} XP
                                    <button onClick={() => deleteTask(day, index)}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="add-task">
                            <input
                                type="text"
                                placeholder={`Add task to ${day}`}
                                value={newTask[day]}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, [day]: e.target.value })
                                }
                            />
                            <button onClick={() => addTask(day)}>Add</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="scroll-effect">
                <div className="scroll-knob"></div>
            </div>
        </div>
    );
};

export default TasksLog;
