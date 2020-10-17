import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from './Modal';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

//require('bootstrap/dist/css/bootstrap.css');

const styles = muiBaseTheme => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  avatar: {
    margin: 10,
    width: 30,
    height: 30
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});

class AdminAboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      avgLOAlignmentRating: this.getAverageLOAlignmentRating(),
      avgOfferingExpectationRating: this.getAverageOfferingExpectationRating(),
      avgCourseSatisfactionRating: this.getAverageCourseSatisfactionRating(),
      usabilityScore: this.getUseabilityScore()
    }
  }

  closeModal = () => {
    this.toggleModal();
    this.props.history.push('/');
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  setAvatarURL = (rating) => {

    {
      switch(rating) {
        case '0':
          return '/images/verysad.png';
        case `1`:
            return `/images/sad.png`;
        case `2`:
            return `/images/justso.png`;
        case `3`:
             return `/images/happy.png`;
        case `4`:
          return `/images/veryhappy.png`;
        default:
            return ``;
      }
    }
  }

  setTitleBasedOnRating = (rating) => {
    switch(rating) {
      case '0':
        return 'Average Rating: Rejected';
      case `1`:
        return `Average Rating: Undecided`;
      case `2`:
        return `Average Rating: Accepted`;
      case `3`:
        return `Average Rating: Accepted`;
      case `4`:
        return `Average Rating: Accepted`;
      default:
          return `No Ratings`;
    }
  }

  getAverageLOAlignmentRating() {

    var count = 0;
    var total = 0;

    this.props.ratingsByUserCourseLO.map((ratingByUserCourselO) => {
      total+= parseInt(ratingByUserCourselO.rating);
      count++;
    });
    return parseInt((total/count)).toString();

  }

  getUseabilityScore() {
    var count = 0;
    var total = 0;

    this.props.userNavigationEvents.map((userNavigationEvent) => {
      if(userNavigationEvent.event == 'login' || userNavigationEvent.event == 'logout')
      {
        // nothing to do
      }
      else
      {
        count++;
      }
    });
    return (100 - count);
  }

  render() {
    return (
      <div className="content-container-dashboard">
      <span id="image">
        <span id="image-inner">
        </span>
      </span>
      <Modal
          show={this.state.showModal}
          closeCallback={this.toggleModal}
          customClass="custom_modal_class"
          >
          <div>
            <Card>
              <CardHeader avatar={<Avatar src={this.setAvatarURL(this.state.avgRating)} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.setTitleBasedOnRating(this.state.avgRating)}/>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Scholacity, Scholarship and Tenacity, is the trait of Lifelong Learning.
                </Typography>
                <Divider/>
                  <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                    Here are the menu options:
                  </Typography>
                  <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }} gutterBottom>  
                    {<b>"My Interests"</b>} menu option takes you to a page from which you may select one or more Learning Outcomes that are of interest. These Learning Outcomes are derived from the course descriptions in the UWF Leisure Learning Course Catalog for the upcoming semester, and are grouped by Knowledge Area.
                  </Typography>
                  <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }} gutterBottom>  
                    {<b>"My Recommendations"</b>} menu option takes you to a page containing the recommendations made by the application based on the Learning Outcomes that you have selected in {'"My Interests"'}. Please {<b>click the recommendation and rate it</b>} using the provided Likert scale.  If you wish to register for the recommended course please also select {<b>"Maintain in Saved Courses"</b>} and then click the "Save" button.
                  </Typography>
                  <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }} gutterBottom>  
                    {<b>"My Courses"</b>} menu option takes you to a page containing the recommendations that you have chosen to save. You may click the saved recommendation and change your rating or de-select it as a saved course at any time.
                  </Typography>
                  <Divider/>
                  <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }} gutterBottom>
                    The Information at the top of this dialog is the average  for all of the recommendations that you have rated.
                  </Typography>
                </CardContent>
                <br/>
            </Card>
            <br/>
            <br/>
            <br/>
            <div>
              <Button title="Close" className="close_modal" onClick={this.closeModal}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>OK</Typography></Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ratingsByUserCourseLO: state.ratings_user_course_lo,
    userNavigationEvents: state.user_navigation_events,
    userSelectionEvents: state.user_selection_events,
    userTimesInModals: state.user_times_in_modals
  };
};

export default connect(mapStateToProps)(AboutPage);
