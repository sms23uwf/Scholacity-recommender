import React from 'react';
import CourseSummary from './CourseSummary';
import CoursesCollapsible from './CoursesCollapsible';
import CourseListFilters from './CourseListFilters';

const CoursesDashboard = () => (
  <div>
    <CourseSummary />
    <CourseListFilters/>
    <CoursesCollapsible />
  </div>
);

export default CoursesDashboard;
