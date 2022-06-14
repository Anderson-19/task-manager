import React from 'react';
import { Route, Routes } from 'react-router-dom';


import { AddTask } from '../components/task/AddTask';
import { DashboardTask } from '../components/task/DashboardTask';

export const DashboardRouter = () => {
  return (
    <div>
        <Routes>
            <Route path="/dashboard" element={ <DashboardTask /> } />
            <Route path="/dashboard/add" element={ <AddTask /> } />
        </Routes>
    </div>
  )
}
