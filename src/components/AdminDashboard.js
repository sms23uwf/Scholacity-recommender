import React from 'react';
import RegistrationSummary from './RegistrationSummary';
import RegistrationsCollapsible from './RegistrationsCollapsible';
import RegistrationListFilters from './RegistrationListFilters';

const CoursesDashboard = () => (
  <div>
    <RegistrationSummary />
    <RegistrationListFilters/>
    <RegistrationsCollapsible />
  </div>
);

export default CoursesDashboard;
