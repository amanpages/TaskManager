import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import TaskDashboard from './components/TaskDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
