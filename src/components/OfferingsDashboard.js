import React from 'react';
import OfferingSummary from './OfferingSummary';
import OfferingsCollapsible from './OfferingsCollapsible';
import OfferingListFilters from './OfferingListFilters';

const OfferingsDashboard = () => (
  <div>
    <OfferingSummary />
    <OfferingListFilters/>
    <OfferingsCollapsible />
  </div>
);

export default OfferingsDashboard;
