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
import ViewScholacityPDF from './DisplayUserManual';
import { Document, Page } from "react-pdf";
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';

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
      showModal: false,
      avgRating: this.getAverageRating(),
      usabilityScore: this.getUseabilityScore(),
      numPages: null,
      pageNumber: 1
    }
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  displayUserDocumentation = () => {
    console.log(`inside displayUserDocumentation`)
    return (
      <header className="header">
      <div className="content-container">
        <div>
          <ViewScholacityPDF pdf={User_Manual_Scholacity}/>
        </div>
      </div>
    </header>
    )
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

                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Divider/>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container direction="row" spacing={1} justify="center" alignItems="center" alignContent="center" >

                      <Grid item>
                        <Button
                          color="primary"
                          aria-label="ViewUserManual"
                          style={{fontWeight: "bold"}}
                          title="ViewUserManual"
                          startIcon={<DescriptionSharpIcon />}
                          onClick={this.toggleModal}><Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000` }}>User Manual</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            </CardContent>
        </Card>
      </div>

      <Modal
          show={this.state.showModal}
          closeCallback={this.toggleModal}
          customClass="custom_modal_class"
          >

          <React.Fragment>
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
          </React.Fragment>
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

