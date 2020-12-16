import React from 'react';
import { connect } from 'react-redux';
import { Document, Page } from "react-pdf";

require('bootstrap/dist/css/bootstrap.css');

class UserManualScholacity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1
    }
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {

    const { pageNumber, numPages } = this.state;

    return (
      <div className="content-container-dashboard">
        <span id="image">
          <span id="image-about">
          </span>
        </span>

        <div>
            <Document
            file='/User_Manual_Scholacity.pdf'
            onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
            options={{ workerSrc: "/pdf.worker.js" }}
            >
            {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
            </Document>
        </div>
      </div>


    );
  }
};

const mapStateToProps = (state) => {
  return {
    userNavigationEvents: state.user_navigation_events,
    userSelectionEvents: state.user_selection_events,
    userTimesInModals: state.user_times_in_modals
  };
};

export default connect(mapStateToProps)(UserManualScholacity);

