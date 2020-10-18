import React from 'react';
import DOWSummary from './DOWSummary';
import DOWCollapsible from './DOWCollapsible';
import DOWListFilters from './DOWListFilters';

const DOWDashboard = () => (
  <div>
    <DOWSummary />
    <DOWListFilters/>
    <DOWCollapsible />
  </div>
);

export default DOWDashboard;
