import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';

const TaskEditForm = ({ taskId, refreshTasks, closeEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do',
    priority: 'Medium',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await taskService.getTask(taskId);
        setFormData(response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to fetch task.');
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.dueDate) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await taskService.updateTask(taskId, formData);
      refreshTasks();
      closeEdit();
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Task</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-300"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-300"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-300"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-300"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Priority</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-300"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Update Task
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            onClick={closeEdit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEditForm;
