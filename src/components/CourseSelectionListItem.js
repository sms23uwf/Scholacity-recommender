import React from 'react';
import { connect } from 'react-redux';
import { startSetCourseSelections, startEditCourseSelection } from '../actions/courseSelections';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import Modal from './Modal';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import selectCourseSelections from '../selectors/courseselections';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import selectSessions from '../selectors/sessions';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel }  from '@material-ui/core';
import moment from 'moment/moment'
import { Work, Assessment, ShoppingCart, LocalLibrarySharp, CloseSharp } from '@material-ui/icons';

const checkBoxStyles = theme => ({
  root: {
    '&$checked': {
      color: '#3D70B2',
    },
  },
  checked: {},
 })

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

class CourseSelectionListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        disposition: props.disposition,
        newDisposition: props.disposition,
        isRegistered: props.disposition === `Registered` ? true : false,
        currentTitle: props.coursename,
        currentDescription: props.coursedescription,
        currentAvatarUrl: this.setAvatarURL(props.rating),
        statusAvatarUrl: this.setStatusAvatarURL(props.disposition),
        timeEnteredModal: Date.now(),
        instructor: props.instructor,
        fee: props.fee
      }
  }
  
  toggleModalWithSave = () => {

    if(this.state.showModal == true)
    {
      this.props.startSetCourseSelections();
    }

    this.setState({
      showModal: !this.state.showModal
    });
    this.recordTimeInModal('save', this.state.currentRating);
  }


  recordTimeInModal = (disposition, rating) => {
    let timeStamp = Date.now();

    let timeInModal = timeStamp - this.state.timeEnteredModal;

    const timeInModalCapture = {timeInModal: timeInModal, userid: this.props.courseselection.userid, disposition: disposition, rating: rating, timeEnteredModal: this.state.timeEnteredModal, timeClosedModal: timeStamp};
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
      showModal: !this.state.showModal,
      isRegistered: false
    });
    this.recordTimeInModal('cancel', this.state.currentRating);
  }

  onCheckSaveToPortfolio = (e) => {

    if(e.target.checked===true)
    {
      this.setState({isRegistered: true});
      this.setState({newDisposition: `Registered`});
    }
    else
    {
      this.setState({isRegistered: false});
      this.setState({newDisposition: `Selected`});
    }

  };

  setStatusAvatarURL = (status) => {
    {
      switch(status) {
        case `Cart`:
          return `/images/shopping_cart.webp`;
        case `Registered`:
          return `/images/noun_submit_icon.png`;
        default:
          return `/images/shopping_cart.webp`;
      }
    }
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

  render() {

    const sessionItems = this.props.sessions.map((session) =>
      <li key={session.session_number}>
        <Grid
          justify="flex-start" 
          container 
          spacing={1}
        >
          <Grid item>
            {session.session_number}
          </Grid>
          <Grid item>
            {session.DOW.padEnd(9)}
          </Grid>
          <Grid item>
            {moment(session.session_date).format('DD MMM YYYY')}
          </Grid>
          <Grid item>
            {moment(session.session_time_start).format('hh:mm A')}
          </Grid>
          <Grid item>
            {moment(session.session_time_end).format('hh:mm A')}
          </Grid>
        </Grid>
      </li>
    );

    return (
      <div>
      <Divider/>
        <CardActionArea onClick={this.toggleModal}>
          <Card>
            <CardHeader avatar={<Avatar src={this.state.statusAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle}/>
            <CardContent>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.currentDescription}
              </Typography>
              <br/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.instructor}   |  {'$' + this.state.fee.toFixed(2)}
              </Typography>
              <br/>
              <Divider/>
              <Avatar src={this.state.currentAvatarUrl} className={"avatar"}/>               
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                Sessions:
                <ul>
                  {sessionItems}
                </ul>
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
                  <h4 className="page-header__title">{this.props.coursename}</h4>
                </div>
              </div>
              <div className="content-container">
                <span>
                <Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                  {this.props.coursedescription}
                </Typography>
                </span>
              </div>

              <div>
              <form action="">
              <label className="statement">This Course Satisfies My Expectation For This Semester's Offerings.</label>
              <ul className='likert'>
                <li>
                  <input type="radio" name="likert" value="0" checked={this.state.newRating === "0"} onChange={(e) => this.recordLocalRating("0",e)}/>
                  <label>Strongly Disagree</label>
                </li>
                <li>
                  <input type="radio" name="likert" value="1" checked={this.state.newRating === "1"} onChange={(e) => this.recordLocalRating("1",e)}/>
                  <label>Disagree</label>
                </li>
                <li>
                  <input type="radio" name="likert" value="2" checked={this.state.newRating === "2"} onChange={(e) => this.recordLocalRating("2",e)}/>
                  <label>Neutral</label>
                </li>
                <li>
                  <input type="radio" name="likert" value="3" checked={this.state.newRating === "3"} onChange={(e) => this.recordLocalRating("3",e)}/>
                  <label>Agree</label>
                </li>
                <li>
                  <input type="radio" name="likert" value="4" checked={this.state.newRating === "4"} onChange={(e) => this.recordLocalRating("4",e)}/>
                  <label>Strongly Agree</label>
                </li>
              </ul>
              </form>

            </div>

            </div>
                <span>
                  <div>
                    <Grid
                    justify="center" 
                    container 
                    spacing={1}
                    >
                        <Grid
                        justify="center" 
                        container 
                        spacing={2}
                        >
                          <Grid item>
                            <Button
                              color="inherit"
                              aria-label="Accept"
                              style={{fontWeight: "bold"}}
                              title="Accept"
                              onClick={this.toggleModalWithSave}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Save</Typography></Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="inherit"
                              aria-label="Cancel"
                              style={{fontWeight: "bold"}}
                              title="Cancel"
                              onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Cancel</Typography></Button>
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
  courseselections: selectCourseSelections(state.courseselections, state.filters),
  courseselection: state.courseselections.find((courseselection) => courseselection.id === props.id),
  sessions: selectSessions(state.sessions, props.courseid),
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseSelection: (id, ratingData) => dispatch(startEditCourseSelection(id, ratingData)),
  startSetCourseSelections: () => dispatch(startSetCourseSelections()),
  startAddRatingsByUserCourseLO: (ratingCapture) => dispatch(startAddRatingsByUserCourseLO(ratingCapture)),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelectionListItem);