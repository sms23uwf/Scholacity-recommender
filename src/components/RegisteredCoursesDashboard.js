import React from 'react';
import RegisteredCoursesSummary from './PortfolioSummary';
import RegisteredCoursesListFilters from './RegisteredCoursesListFilters';
import RegisteredCoursesList from './RegisteredCoursesList';

const RegisteredCoursesDashboard = () => (
  <div>
  <RegisteredCoursesSummary />
  <RegisteredCoursesListFilters />
  <RegisteredCoursesList />
</div>
);

export default RegisteredCoursesDashboard;
