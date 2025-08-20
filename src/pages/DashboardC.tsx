import { Routes, Route } from 'react-router-dom';
import Layout from './dashboard/dashboardcomponents/Layout.tsx';
import Dashboard from './dashboard/Dashboard.tsx';
import Users from './dashboard/Users.tsx';
import Pricing from './dashboard/Pricing.tsx';
import React from 'react';

function DashboardC() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>
    </Routes>
  );
}

export default DashboardC;
