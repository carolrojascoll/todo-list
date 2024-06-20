//CAROLINA ROJAS COLLANTE
import React, { useState, useEffect } from 'react';
import './App.css';

// Componente de una sola tarea
const Task = ({ task, index, toggleComplete, removeTask }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          flex: 1
        }}
      >
        {task.text}
      </span>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(index)}
      />
      <button onClick={() => removeTask(index)}>Delete</button>
    </div>
  );
};

// Componente principal de la lista de tareas
const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Cargar tareas del almacenamiento local al inicializar
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Guardar tareas en el almacenamiento local al cambiar
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Agregar nueva tarea
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Alternar estado de finalización de la tarea
  const toggleComplete = index => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  // Eliminar tarea
  const removeTask = index => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <div>
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            toggleComplete={toggleComplete}
            removeTask={removeTask}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}

export default App;
