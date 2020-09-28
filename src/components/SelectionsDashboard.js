import React from 'react';
import CourseSelectionsSummary from './CourseSelectionSummary';
import CourseSelectionListFilters from './CourseSelectionListFilters';
import CourseSelectionsList from './CourseSelectionList';

const SelectionsDashboard = () => (
  <div>
    <CourseSelectionsSummary />
    <CourseSelectionListFilters />
    <CourseSelectionsList />
  </div>
);

export default SelectionsDashboard;
