import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from './Modal';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
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
            return `/images/shopping-cart.png`;
        case `Registered`:
            return `/images/briefcase.jpg`;
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
            <CardHeader titleTypographyProps={{variant:'h4'}} title="Scholacity Work Flow"/>
            <CardActionArea>
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
                        {<b>"Courses By Domain"</b>} menu option takes you to a page from which you may browse all available courses, organized by Knowledge Area, and select one or more courses that are of interest. You may save it to your shopping cart for further review, or you may save it to the courses for which you intend to register.
                        </Typography>
                        <br/>
                        <br/>
                        <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>
                        {<b>"Courses By Day"</b>} menu option takes you to a page from which you may browse all available courses, organized by Day of the Week, and select one or more courses that are of interest. You may save it to your shopping cart for further review, or you may save it to the courses for which you intend to register. 
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
                      {<b>"My Selections"</b>} menu option takes you to your shopping cart of selected courses saved for further review.                      
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
                      {<b>"My Courses"</b>} menu option takes you to a page containing the courses for which you plan to register.
                      </Typography>
                      </React.Fragment>
                      } />
                  </ListItem>
                </List>

                </CardContent>
            </CardActionArea>
                <br/>
            </Card>
            <br/>
            <br/>
            <br/>
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
    ratingsByUserCourseLO: state.ratings_user_course_lo,
    userNavigationEvents: state.user_navigation_events,
    userSelectionEvents: state.user_selection_events,
    userTimesInModals: state.user_times_in_modals
  };
};

export default connect(mapStateToProps)(AboutPage);

