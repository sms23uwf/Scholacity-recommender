import React from 'react';
import { connect } from 'react-redux';
import { startSetCourseSelections } from '../actions/courseSelections';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startApproveRegistrationForUser_Course } from '../actions/registrations';
import Modal from './Modal';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import selectCourseSelections from '../selectors/courseselections';
import selectSessions from '../selectors/sessions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel }  from '@material-ui/core';
import { firebase } from '../firebase/firebase';
import moment from 'moment/moment'
import { Work, CheckSharp, Assessment, ShoppingCart, LocalLibrarySharp, CloseSharp } from '@material-ui/icons';

class RegistrationListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        registration_id: props.id,
        instructor: props.course_instructor,
        fee: props.course_fee,
        status: props.registration_status,
        courseid: props.courseid,
        currentTitle: props.course_name,
        user_email: props.user_email,
        registration_userid: props.userid,
        currentAvatarUrl: this.setAvatarURL(props.registration_status),
        timeEnteredModal: Date.now(),
        userid: firebase.auth().currentUser.uid
      }
  }
  
  recordTimeInModal = (disposition, rating) => {
    let timeStamp = Date.now();

    let timeInModal = timeStamp - this.state.timeEnteredModal;

    const timeInModalCapture = {timeInModal: timeInModal, userid: this.state.userid, disposition: disposition, rating: rating, timeEnteredModal: this.state.timeEnteredModal, timeClosedModal: timeStamp};
    this.props.startAddUserTimeInModal(timeInModalCapture);
  }

  toggleModal = () => {
    let timeStamp = Date.now();
    if(this.state.showModal == false)
    {
      this.setState({
        timeEnteredModal: timeStamp
      })
    } 
    this.setState({
      showModal: !this.state.showModal
    });
  }

  toggleModalWithCancel = () => {

    this.setState({
      showModal: !this.state.showModal
    });
    this.recordTimeInModal('cancel', this.state.currentRating);
  }

  toggleModalWithApproval = () => {

    if(this.state.showModal == true)
    {
      const registrationUserPairing = {
          registration_id: this.state.registration_id, 
          registration_userid: this.state.registration_userid
       };

       console.log(`inside toggleModalWithApproval with registration_id: ${this.state.registration_id}`);

       this.props.startApproveRegistrationForUser_Course(registrationUserPairing);
    }

    this.setState({
      showModal: !this.state.showModal,
      disposition: 'Registered',
      currentAvatarUrl: this.setAvatarURL('Registered')
    });
    this.recordTimeInModal('register', this.state.currentRating);


  }

  setAvatarURL = (status) => {
    {
      switch(status) {
        case 'Open':
          return '/images/local_library.png';
        case `Interested`:
            return `/images/shopping_cart.webp`;
        case `Registered`:
            return `/images/briefcase.jpg`;
        default:
            return '/images/local_library.png';
      }
    }
  }

  render() {

    return (
      <div>
      <Divider/>
        <CardActionArea onClick={this.toggleModal}>
          <Card>
            <CardHeader avatar={<Avatar src={this.state.currentAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle}/>
            <CardContent>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.instructor}   |  {'$' + this.state.fee.toFixed(2)}
              </Typography>
              <br/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.user_email}
              </Typography>
              <br/>
              <Divider/>
            </CardContent>
          </Card>
        </CardActionArea>

        <Modal
          show={this.state.showModal}
          customClass="custom_modal_class"
        >
          <React.Fragment>
            <div>
              <div className="modal-header">
                <div className="content-container">
                  <h4 className="page-header__title">{this.props.name}</h4>
                </div>
              </div>
              <div className="content-container">
                <span>
                <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.instructor}   |  {'$' + this.state.fee.toFixed(2)}
                </Typography>
                <br/>
                <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                    {this.state.user_email} has submitted a registration request for this course.
                </Typography>
                
                </span>
              </div>
            </div>
                <span>
                  <div>
                    <Grid
                    justify="center" 
                    container 
                    spacing={1}
                    >
                      <Grid item>
                      </Grid>

                        <Grid
                        justify="center" 
                        container 
                        spacing={2}
                        >
                          <Grid item>
                            <Button
                              disabled={this.state.isRegistered}
                              color="primary"
                              aria-label="Approve"
                              style={{fontWeight: "bold"}}
                              title="Approve"
                              startIcon={<CheckSharp />}
                              onClick={this.toggleModalWithApproval}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Approve</Typography>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              aria-label="Cancel"
                              style={{fontWeight: "bold"}}
                              title="Cancel"
                              startIcon={<CloseSharp />}
                              onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Exit</Typography></Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                </span>
          </React.Fragment>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startApproveRegistrationForUser_Course: (registrationUserPairing) => dispatch(startApproveRegistrationForUser_Course(registrationUserPairing)),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationListItem);