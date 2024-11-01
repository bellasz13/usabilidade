import React, { useState } from 'react';
import './App.css';
import Task from '../../Task';

function App() {
  const [tasks, setTasks] = useState(['Estudar React', 'Fazer exercício', 'Caminhar']);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];   
    updatedTasks.splice(index, 1); 
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Minha Lista de Tarefas</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={handleAddTask}>Adicionar</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <Task task={task} />
            <button onClick={() => handleRemoveTask(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;