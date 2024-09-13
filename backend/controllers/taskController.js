const Task = require('../models/Task');
const mongoose = require('mongoose');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  try {
    const task = new Task({ title, description, dueDate, status, priority, user: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all tasks for a user with filters
exports.getTasks = async (req, res) => {
  const { status, priority } = req.query;
  let filters = { user: req.user.id };
  if (status) filters.status = status;
  if (priority) filters.priority = priority;

  try {
    const tasks = await Task.find(filters);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    // Check if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid task ID format' });
    }

    // Find the task by ID
    const task = await Task.findById(req.params.id);

    if (task) {
      // Ensure the task belongs to the authenticated user
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to access this task' });
      }
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    console.error('Error fetching task:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    // Validate input
    if (!title || !description || !dueDate) {
      return res.status(400).json({ msg: 'Please fill all required fields' });
    }

    // Find the task by ID
    let task = await Task.findById(req.params.id);

    // If task not found, return 404
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this task' });
    }

    // Update the task fields
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;
    task.priority = priority;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ error: 'Server error while updating the task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {

    // Check if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid task ID format' });
    }
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this task' });
    }

    // Delete the task
    await Task.findByIdAndDelete(req.params.id);
    
    res.json({ msg: 'Task removed successfully' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ error: 'Server error while deleting the task' });
  }
};
