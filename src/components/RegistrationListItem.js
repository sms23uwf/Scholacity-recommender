import React from 'react';
import { connect } from 'react-redux';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startApproveRegistrationForUser_Course } from '../actions/registrations_admin';
import Modal from './Modal';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { firebase } from '../firebase/firebase';
import { CheckSharp, CloseSharp } from '@material-ui/icons';

class RegistrationListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        approve_button_label: props.registration_status == 'approved' ? 'APPROVED' : 'APPROVE',
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
       this.props.startApproveRegistrationForUser_Course(registrationUserPairing);
    }

    this.setState({
      showModal: !this.state.showModal,
      status: 'approved',
      approve_button_label: 'APPROVED',
      currentAvatarUrl: this.setAvatarURL('approved')
    });
    this.recordTimeInModal('register', this.state.currentRating);
  }

  setAvatarURL = (status) => {
    {
      switch(status) {
        case `requested`:
          return `/images/shopping-cart.png`
        case `approved`:
          return `/images/shopping-cart.png`
        default:
          return `/images/shopping-cart.png`
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
                Instructor: {this.state.instructor}   |  Fee: {'$' + this.state.fee.toFixed(2)} 
              </Typography>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                Registration for: {this.state.user_email}  
              </Typography>
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
                  <h4 className="page-header__title">{this.state.currentTitle}</h4>
                </div>
              </div>
              <div className="content-container">
                <span>
                  <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                    Instructor: {this.state.instructor}   |  Fee: {'$' + this.state.fee.toFixed(2)} 
                  </Typography>
                  <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                    Registration for: {this.state.user_email}  
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
                              hidden={true}
                              color="primary"
                              aria-label="Approve"
                              style={{fontWeight: "bold"}}
                              title="Approve"
                              startIcon={<CheckSharp />}
                              onClick={this.toggleModalWithApproval}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>{this.state.approve_button_label}</Typography>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                </span>
                <div>
                  <Button title="Close" className="close_modal" onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>X</Typography></Button>
                </div>
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