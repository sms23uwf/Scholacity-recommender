import React from 'react';
import AdminOfferingSummary from './AdminOfferingSummary';
import AdminOfferingsCollapsible from './AdminOfferingsCollapsible';
import AdminOfferingListFilters from './AdminOfferingListFilters';

const AdminOfferingsDashboard = () => (
  <div>
    <AdminOfferingSummary />
    <AdminOfferingListFilters/>
    <AdminOfferingsCollapsible />
  </div>
);

export default AdminOfferingsDashboard;
