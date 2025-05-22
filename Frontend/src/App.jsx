import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_APP_API_URL;

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

 
  const addTodo = async () => {
    if (!newTask.trim()) return;
    
    try {
      const response = await axios.post(`${API_URL}/todos`, { task: newTask });
      setTodos([response.data, ...todos]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/todos/${id}/${currentStatus ? 'incomplete' : 'complete'}`);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  
  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/summarize`);
      setSummary(response.data.summary || response.data.fallbackSummary);
    } catch (error) {
      setSummary('Failed to generate summary. Please try again.');
      console.error('Error generating summary:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Smart Todo App</h1>
        <p>Organize your tasks with AI summaries</p>
      </header>

      <div className="container">
        {/* Add Task Section */}
        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>Add Task</button>
        </div>

        {/* Task List */}
        <div className="task-list">
          <h2>Your Tasks</h2>
          {todos.length === 0 ? (
            <p className="no-tasks">No tasks yet. Add one above!</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id, todo.completed)}
                    />
                    <span>{todo.task}</span>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary Section */}
        <div className="summary-section">
          <button 
            onClick={generateSummary}
            disabled={loading || todos.length === 0}
          >
            {loading ? 'Generating...' : 'Get AI Summary'}
          </button>
          
          {summary && (
            <div className="summary-box">
              <h3>AI Summary</h3>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;