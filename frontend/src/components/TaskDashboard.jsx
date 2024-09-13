import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import taskService from '../services/taskService';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import authService from '../services/authService'; // Import authService for logout

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks(filters);
      setTasks(response);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Task Form */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mb-8">
        <TaskForm refreshTasks={fetchTasks} />
      </div>

      {/* Filters Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Tasks</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Status Filter</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-300"
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Priority Filter</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-300"
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Task List</h2>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task._id} task={task} refreshTasks={fetchTasks} />
          ))
        ) : (
          <p className="text-center text-gray-600">No tasks available. Add a new task above.</p>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
