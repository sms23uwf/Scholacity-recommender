import React from 'react';
import AdminDOWSummary from './AdminDOWSummary';
import AdminDOWCollapsible from './AdminDOWCollapsible';
import AdminDOWListFilters from './AdminDOWListFilters';

const AdminDOWDashboard = () => (
  <div>
    <AdminDOWSummary />
    <AdminDOWListFilters/>
    <AdminDOWCollapsible />
  </div>
);

export default AdminDOWDashboard;
