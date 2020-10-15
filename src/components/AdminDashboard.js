import React from 'react';
import RegistrationSummary from './RegistrationSummary';
import RegistrationsCollapsible from './RegistrationsCollapsible';
import RegistrationListFilters from './RegistrationListFilters';
import RegistrationList from './RegistrationList';


const AdminDashboard = () => (
  <div>
    <RegistrationSummary />
    <RegistrationListFilters/>
    <RegistrationList />
  </div>
);

export default AdminDashboard;
