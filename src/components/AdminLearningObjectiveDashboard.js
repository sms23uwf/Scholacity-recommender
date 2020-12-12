import React from 'react';
import AdminLearningObjectiveSummary from './AdminLearningObjectiveSummary';
import AdminLearningObjectivesCollapsible from './AdminLearningObjectivesCollapsible';
import AdminLearningObjectiveListFilters from './AdminLearningObjectiveListFilters';

const AdminLearningObjectiveDashboard = () => (
  <div>
    <AdminLearningObjectiveSummary />
    <AdminLearningObjectiveListFilters/>
    <AdminLearningObjectivesCollapsible />
  </div>
);

export default AdminLearningObjectiveDashboard;
