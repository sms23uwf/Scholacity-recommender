import React from 'react';
import MaintenanceSummary from './MaintenanceSummary';
import MaintenanceCollapsible from './MaintenanceCollapsible';
import MaintenanceListFilters from './MaintenanceListFilters';

const MaintenanceDashboard = () => (
  <div>
    <MaintenanceSummary />
    <MaintenanceListFilters/>
    <MaintenanceCollapsible />
  </div>
);

export default MaintenanceDashboard;
