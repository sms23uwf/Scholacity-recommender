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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { AssignmentSharp } from '@material-ui/icons';

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

  getLOAlignmentTitle = () => {
    return 'Average Rating of Alignment of Learning Outcomes with Course Description:'
  }

  getAverageLOAlignmentRating() {

    var count = 0;
    var total = 0;

    this.props.ratings_lo_alignment.map((record) => {
      total+= parseInt(record.rating);
      count++;
    });
    return parseInt((total/count)).toString();

  }

  getAverageOfferingExpectationRating = () => {

    var count = 0;
    var total = 0;

    this.props.ratings_course_offerings.map((record) => {
      total+= parseInt(record.rating);
      count++;
    });
    return parseInt((total/count)).toString();

  }


  getAverageCourseSatisfactionRating = () => {

    var count = 0;
    var total = 0;

    this.props.ratings_course_satisfaction.map((record) => {
      total+= parseInt(record.rating);
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
              <CardHeader titleTypographyProps={{variant:'h4'}} title="About Scholacity Administration"/>
              <CardContent>
                <Typography variant="h5" component="h5" gutterBottom>
                  Scholacity -  Scholarship and Tenacity - the pursuit of Lifelong Learning.
                </Typography>
                <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                The only Administrative activity currently available is the Approval of Course Registrations. More to come. The Program Director and/or system administrator may also review and test the functionality available to the users.
                </Typography>
                <Divider/>
                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={this.setAvatarURL(this.state.avgLOAlignmentRating)}/>
                    </ListItemAvatar>
                    <ListItemText primary={
                      <React.Fragment>
                      <Typography variant="h5" component="h5" gutterBottom>Average User Rating of Stated Learning Outcomes</Typography>
                      </React.Fragment>
                      } />
                  </ListItem>
                  <Divider/>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={this.setAvatarURL(this.state.avgOfferingExpectationRating)}/>
                    </ListItemAvatar>
                    <ListItemText primary={
                      <React.Fragment>
                      <Typography variant="h5" component="h5" gutterBottom>Average User Rating of Offerings Expectations</Typography>
                      </React.Fragment>
                      } />
                  </ListItem>
                  <Divider/>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={this.setAvatarURL(this.state.avgCourseSatisfactionRating)}/>
                    </ListItemAvatar>
                    <ListItemText primary={
                      <React.Fragment>
                      <Typography variant="h5" component="h5" gutterBottom>Average User Rating of Course Satisfaction</Typography>
                      </React.Fragment>
                      } />
                  </ListItem>
                </List>
                </CardContent>
                <br/>
            </Card>
            <div>
              <Button title="Close" className="close_modal" onClick={this.closeModal}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>X</Typography></Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    ratings_lo_alignment: state.ratings_all_lo_alignment,
    ratings_course_offerings: state.ratings_all_course_offerings,
    ratings_course_satisfaction: state.ratings_all_course_satisfaction,
    userNavigationEvents: state.user_navigation_events,
    userSelectionEvents: state.user_selection_events,
    userTimesInModals: state.user_times_in_modals
  };
};

export default connect(mapStateToProps)(AdminAboutPage);

