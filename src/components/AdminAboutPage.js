import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from './Modal';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReactStars from "react-rating-stars-component";
//import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  getAverageOfferingExpectationRating = () => {

    var count = 0;
    var total = 0;

    this.props.ratings_course_offerings.map((record) => {
      total+= parseInt(record.rating);
      count++;
    });

    console.log(`total: ${total}`);
    console.log(`count: ${count}`);

    if (count == 0 || total == 0)
      return 0;

    return parseInt((total/count));

  }


  getAverageCourseSatisfactionRating = () => {

    var count = 0;
    var total = 0;

    this.props.ratings_course_satisfaction.map((record) => {
      total+= parseInt(record.rating);
      count++;
    });

    console.log(`total: ${total}`);
    console.log(`count: ${count}`);

    if (count == 0 || total == 0)
    return 0;

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

    const selectionRatingSchema = {
      size: 32,
      count: 5,
      edit: false,
      color: "#CDCDCD",
      activeColor: "black",
      value: this.state.avgOfferingExpectationRating,
      ally: true,
      isHalf: false,  
      emptyIcon: <i className="far fa-star"></i>,
      fullIcon: <i className="fa fa-star"></i>
    };
  
    const courseRatingSchema = {
      size: 32,
      count: 5,
      edit: false,
      color: "#CDCDCD",
      activeColor: "black",
      value: this.state.avgCourseSatisfactionRating,
      ally: true,
      isHalf: false,  
      emptyIcon: <i className="far fa-star"></i>,
      fullIcon: <i className="fa fa-star"></i>
    };
  
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
                The only Administrative activities currently available are Viewing Course Registrations, and Viewing Course Offerings. More to come.
                </Typography>
                <br/>
                <Divider/>
                <br/>

                <div>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>Average User Agreement to this Statement: "This course fits With a desired Learning Outcome, and is the type of course I was hoping to find."</Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <ReactStars {...selectionRatingSchema} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>

                <br/>
                <Divider/>
                <br/>

                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" padding="2em">
                        <Grid item>
                          <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }}>Average Rating based on the following statement: "Having taken this course, I found that it satisfied my learning goals and expectations."</Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="center" alignItems="center" alignContent="center" >
                        <Grid item>
                          <ReactStars {...courseRatingSchema} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
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
    ratings_course_offerings: state.ratings_all_course_offerings,
    ratings_course_satisfaction: state.ratings_all_course_satisfaction,
    userNavigationEvents: state.user_navigation_events,
    userSelectionEvents: state.user_selection_events,
    userTimesInModals: state.user_times_in_modals
  };
};

export default connect(mapStateToProps)(AdminAboutPage);

