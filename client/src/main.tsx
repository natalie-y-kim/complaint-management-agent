import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ComplaintForm from './components/ComplaintForm.tsx';
import AdminDashboard from './components/AdminDashboard.tsx'; 

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/submit" element={<ComplaintForm />} />
        <Route path="/admin" element={<AdminDashboard />} /> {}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

