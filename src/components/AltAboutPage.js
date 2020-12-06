import React from 'react';
import Modal from './Modal';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';


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

class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      avgRating: this.getAverageRating(),
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

  setWorkflowAvatarURL = (status) => {
    {
      switch(status) {
        case 'Open':
          return '/images/local_library.png';
        case `Cart`:
            return `/images/noun_light_bulb.png`;
        case `Registered`:
            return `/images/shopping-cart.png`;
        default:
            return '/images/local_library.png';
      }
    }
  }

  getAverageRating() {

    var count = 0;
    var total = 0;

    this.props.ratingsByUserCourseLO.map((ratingByUserCourselO) => {
      total+= parseInt(ratingByUserCourselO.rating);
      count++;
    });
    return parseInt((total/count));

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
            <CardHeader titleTypographyProps={{variant:'h4'}} title="Scholacity Menu Options"/>
              <CardContent>
                <Typography variant="h5" component="h5" gutterBottom>
                  Scholacity -  Scholarship and Tenacity - the pursuit of Lifelong Learning.
                </Typography>

                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={this.setWorkflowAvatarURL('Open')}/>
                    </ListItemAvatar>
                    <ListItemText primary={
                      <React.Fragment>
                        <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>
                        {<i>Courses By Domain</i>} menu option takes you to a page from which you may browse all available courses, organized by Knowledge Area, and select one or more courses that are of interest. You may {<i>save it for for further review</i>}, or you may {<i>Select the Register Button</i>} and save it to the courses for which you plan to register.
                        </Typography>
                        <br/>
                        <br/>
                        <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>
                        {<i>Courses By Day</i>} menu option takes you to a page from which you may browse all available courses, organized by Day of the Week, and select one or more courses that are of interest. You may {<i>save it for for further review</i>}, or you may {<i>Select the Register Button</i>} and save it to the courses for which you plan to register. 
                        </Typography>
                      </React.Fragment>
                      } />
                  </ListItem>
                  <Divider/>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={this.setWorkflowAvatarURL('Cart')}/>
                    </ListItemAvatar>
                    <ListItemText primary={
                      <React.Fragment>
                      <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>
                      {<i>My Selections</i>} menu option takes you to your selected courses saved for further review. Please click the {<i>Rating button</i>} and rate the recommendation using the provided {<i>Star Rating Scale</i>}.  If you plan to register for the recommended course please also select {<i>Register Button</i>} and then select the {<i>Confirm Register Button</i>} on the modal confirmation dialog. You may also {<i>Remove</i>} a saved course, once you have rated it, by similarly using the {<i>Remove Button</i>}.                      
                      </Typography>
                      </React.Fragment>
                      } />
                  </ListItem>
                  <Divider/>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={this.setWorkflowAvatarURL('Registered')}/>
                    </ListItemAvatar>
                    <ListItemText primary={
                      <React.Fragment>
                      <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>
                      {<i>My Courses</i>} menu option takes you to a page containing the courses for which you plan to register. Please click the {<i>Rating button</i>} and rate the recommendation using the provided {<i>Star Rating Scale</i>}.  You may also {<i>Remove</i>} a course if you change your mind, once you have rated it, by using the {<i>Remove Button</i>} and confirming the removal on the confirmation modal dialog.
                      </Typography>
                      </React.Fragment>
                      } />
                  </ListItem>

                  <ListItem>
                    <Grid container justify="center">
                      <Grid item xs={12} style={{textAlign: "center"}}>
                        <Button
                          color="inherit"
                          aria-label="Cancel"
                          style={{fontWeight: "bold"}}
                          title="Cancel"
                          onClick={this.closeModal}><Typography style={{ fontSize: '2.5em', fontWeight: `bold`, color: `#000000` }}>OK</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>

                </List>

                </CardContent>
                <br/>
            </Card>
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

