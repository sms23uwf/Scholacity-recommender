import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ReactStars from "react-rating-stars-component";
import { setUUIDFilter } from '../actions/filters';

require('bootstrap/dist/css/bootstrap.css');

class AdminAboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avgOfferingExpectationRating: this.getAverageOfferingExpectationRating(),
      avgCourseSatisfactionRating: this.getAverageCourseSatisfactionRating(),
      usabilityScore: this.getUseabilityScore(),
      numPages: null,
      pageNumber: 1
    }
  }

  getAverageOfferingExpectationRating = () => {

    var count = 0;
    var total = 0;

    this.props.ratings_course_offerings.map((record) => {
      total+= parseInt(record.rating);
      count++;
    });

    console.log(`count: ${count}, total: ${total}`)
    if (count == 0 || total == 0)
      return 0;

    console.log(`average course expectation: ${total/count}`)

    return parseInt((total/count));

  }


  getAverageCourseSatisfactionRating = () => {

    var count = 0;
    var total = 0;

    this.props.ratings_course_satisfaction.map((record) => {
      total+= parseInt(record.rating);
      count++;
    });

    console.log(`count: ${count}, total: ${total}`)

    if (count == 0 || total == 0)
    return 0;

    console.log(`average course satisfaction: ${total/count}`)
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
          <span id="image-about">
          </span>
        </span>
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
              <br/>
              <Divider/>
              <br/>
              </CardContent>
              <br/>
          </Card>
        </div>
      </div>
    );


  }
};

const mapDispatchToProps = (dispatch) => ({
  setUUIDFilter: (userid) => dispatch(setUUIDFilter(userid))
})

const mapStateToProps = (state) => {
  return {
    ratings_course_offerings: state.ratings_all_course_offerings,
    ratings_course_satisfaction: state.ratings_all_course_satisfaction,
    userNavigationEvents: state.user_navigation_events,
    userSelectionEvents: state.user_selection_events,
    userTimesInModals: state.user_times_in_modals
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAboutPage);

