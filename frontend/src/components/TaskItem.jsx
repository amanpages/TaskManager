import React, { useState } from 'react';
import taskService from '../services/taskService';
import TaskEditForm from './TaskEditForm'; // Import the edit form

const TaskItem = ({ task, refreshTasks }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(task._id);
      refreshTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
      {isEditing ? (
        <TaskEditForm taskId={task._id} refreshTasks={refreshTasks} closeEdit={toggleEdit} />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <div className="space-x-4">
              <button
                onClick={toggleEdit}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>

          <p className="text-gray-600 mt-2">{task.description}</p>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Due Date:</p>
              <p className="text-gray-800">{task.dueDate}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Status:</p>
              <p className={`font-semibold ${task.status === 'Done' ? 'text-green-500' : 'text-blue-500'}`}>
                {task.status}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Priority:</p>
              <p
                className={`font-semibold ${
                  task.priority === 'High'
                    ? 'text-red-500'
                    : task.priority === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}
              >
                {task.priority}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
