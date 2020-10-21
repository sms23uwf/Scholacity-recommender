import React from 'react';
import { connect } from 'react-redux';
import selectRegistrationsAll from '../selectors/registration_all';
import selectRegistrationsTotal from '../selectors/registrations-total';

export const RegistrationSummary = ({ coursesCount, coursesTotal }) => {
  return (
    <div className="page-header">
      <div className="content-container">
        <h3 className="page-header__title">Registrations</h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleRegistrations= selectRegistrationsAll(state.registrations_all, state.filters);

  return {
    registrationsCount: visibleRegistrations.length,
    registrationsTotal: selectRegistrationsTotal(visibleRegistrations)
  };
};

export default connect(mapStateToProps)(RegistrationSummary);
