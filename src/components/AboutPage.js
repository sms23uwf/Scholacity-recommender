import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

require('bootstrap/dist/css/bootstrap.css');


class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      avgRating: this.getAverageRating(),
      usabilityScore: this.getUseabilityScore(),
      numPages: null,
      pageNumber: 1
    }
  }

  setWorkflowAvatarURL = (status) => {
    {
      switch(status) {
        case 'Open':
          return '/images/thinking_face.png';
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

    const { pageNumber, numPages } = this.state;

    return (
      <div className="content-container-dashboard">
        <span id="image">
          <span id="image-about">
          </span>
        </span>
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
                    {<i>My Interests</i>} menu option takes you to a page from which you may select, by check box, one or more Learning Outcomes that are of interest. These Learning Outcomes are derived from the course descriptions in the UWF Leisure Learning Course Catalog for the upcoming semester, and are grouped by Knowledge Area.
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
                    {<i>My Recommendations</i>} menu option takes you to a page containing the recommendations made by the application based on the Learning Outcomes that you have selected in {<i>My Interests</i>}. Please click the {<i>Rating button</i>} and rate the recommendation using the provided {<i>Star Rating Scale</i>}.  If you plan to register for the recommended course please also select {<i>Register Button</i>} and then select the {<i>Confirm Register Button</i>} on the modal confirmation dialog. You may also {<i>Remove</i>} a recommendation, once you have rated it, by similarly using the {<i>Remove Button</i>}.
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
                    {<i>My Courses</i>} menu option takes you to a page containing the courses for which you plan to register. Please click the {<i>Rating button</i>} and rate the recommendation using the provided {<i>Star Rating Scale</i>}. You may also {<i>Remove</i>} a course if you change your mind, once you have rated it, by using the {<i>Remove Button</i>} and confirming the removal on the confirmation modal dialog.
                    </Typography>
                    </React.Fragment>
                    } />
                </ListItem>
              </List>
            </CardContent>
        </Card>
      </div>
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

