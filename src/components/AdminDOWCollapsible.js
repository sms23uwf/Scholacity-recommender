import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import Collapsible from './Collapsible';
import AdminDOWList from './AdminDOWList';

 export const AdminDOWCollapsible = (props) => (
    props.days_of_week.map(dow => {
        return (
            <div key={dow.name} className="content-container-planner">
                <Collapsible key={dow.name} title={dow.name}>
                    <AdminDOWList key={dow.name} {...dow}/>
                </Collapsible>
            </div>
        )
    })
  );
  
  const mapStateToProps = (state) => {
    return {
      days_of_week: state.days_of_week,
      checkboxChecked: false
    };
  };
  
  export default connect(mapStateToProps)(AdminDOWCollapsible);