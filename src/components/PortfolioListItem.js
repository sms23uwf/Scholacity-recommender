import React from 'react';
import { connect } from 'react-redux';
import { startEditCourseRecommendation, startRemoveCourseRecommendation } from '../actions/courseRecommendations';
import { startAddRatingsByUserCourse } from '../actions/ratingsByUserCourse';
import { startAddUserTimeInModal } from '../actions/timeInModal';
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
import moment from 'moment/moment';
import { Work, SaveSharp, Assessment, ShoppingCart, LocalLibrarySharp, CloseSharp } from '@material-ui/icons';
import selectSessions from '../selectors/sessions';


class PortfolioListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        instructor: props.instructor,
        fee: props.fee,
        disposition: props.disposition,
        newDisposition: props.disposition,
        isPortFolio: props.disposition === `Portfolio` ? true : false,
        currentRating: props.rating,
        newRating: props.rating,
        currentTitle: props.coursename,
        statusAvatarUrl: this.setStatusAvatarURL('Approved'),
        itemIsKeeper: true,
        recommendationPairing: 0,
        timeEnteredModal: Date.now()
      }
  }
  toggleModalWithSave = () => {

    if((this.state.newRating != this.state.currentRating) || (this.state.newDisposition != this.state.disposition))
      this.recordRating(this.props.courserecommendation.id, this.state.newRating, this.state.newDisposition, this.props.courserecommendation.courseid, this.props.courserecommendation.userid, this.props.courserecommendation.learningobjectives);

      if(this.state.itemIsKeeper == false)
      {
        this.props.startRemoveCourseRecommendation(this.state.recommendationPairing);
      }

    this.setState({
      showModal: !this.state.showModal
    });
    this.recordTimeInModal('save', this.state.currentRating);
  }

  recordTimeInModal = (disposition, rating) => {
    let timeStamp = Date.now();

    let timeInModal = timeStamp - this.state.timeEnteredModal;

    const timeInModalCapture = {timeInModal: timeInModal, userid: this.props.courserecommendation.userid, disposition: disposition, rating: rating, timeEnteredModal: this.state.timeEnteredModal, timeClosedModal: timeStamp};
    this.props.startAddUserTimeInModal(timeInModalCapture);
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      newRating: this.state.currentRating,
    });
  }

  toggleModalWithCancel = () => {
    this.setState({
      showModal: !this.state.showModal,
      newRating: this.state.currentRating,
      isPortFolio: this.state.disposition === `Portfolio` ? true : false
    });
    this.recordTimeInModal('cancel', this.state.currentRating);
  }

  onCheckSaveToPortfolio = (recommendationPairing,keeperCount,e) => {

    if(e.target.checked===true)
    {
      this.setState({isPortFolio: true});
      this.setState({newDisposition: `Portfolio`});
    }
    else
    {

      this.setState({isPortFolio: false});
      this.setState({newDisposition: `Undecided`});

      // put a check here to see if any remaining LO associated with this former portfolio item
      // if not, startRemoveCourseRecommendation

      this.setState({itemIsKeeper: true});
      this.setState({recommendationPairing: recommendationPairing});

      if(keeperCount < 1)
      {
        this.setState({itemIsKeeper: false});
      }
    }

  };

  handleRatingChange = event => {
    this.setState({newRating: event.target.value});
  }

  recordLocalRating = (rating,e) => {
    this.setState({newRating: rating});

    if(rating != this.state.currentRating)
      this.recordRating(this.props.id, rating, this.props.courseid, this.props.userid);

    this.setState({currentRating: rating});
  }

  recordRating = (id,rating,disposition,courseid,userid) => {
    this.setState({currentRating: rating});
    const ratingData = {rating: rating, disposition: disposition};
    this.props.startEditCourseRecommendation(id, ratingData);

    const ratingCapture = {courseid: courseid, userid: userid, rating: rating};
    this.props.startAddRatingsByUserCourse(ratingCapture);
  }

  setStatusAvatarURL = (status) => {
    {
      switch(status) {
        case `Cart`:
          return `/images/shopping-cart.png`;
        case `Registered`:
          return `/images/pending-order.png`;
        case 'Approved':
          return `/images/briefcase.jpg`
        default:
          return `/images/briefcase.jpg`;
      }
    }
  }

  render() {

    const recommendationPairing = {id: this.props.id};

    var keeperData = {...this.props.learningobjectives};
    const keeperResult = Object.keys(keeperData).map((key) => keeperData[key]);
    var keepers = [];
    keeperResult.forEach((keeper) => (
      keepers.push(<li key={keeper.learningobjectiveid}>{keeper.content}</li>)
     ));

    var keeperCount = keepers.length;

    var reasonData = {...this.props.learningojectives};
    const result = Object.keys(reasonData).map((key) => reasonData[key]);

    var reasons = [];
    result.forEach((reason) => (
     reasons.push(<li key={reason.learningobjectiveid}>{reason.content}</li>)
    ));

    const sessionItems = this.props.sessions.map((session) =>
      <li key={session.session_number}>
        <Grid
          justify="flex-start" 
          container 
          spacing={1}
        >
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {session.session_number}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {session.DOW.substring(0,3).toUpperCase()}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {moment(session.session_date).format('DD MMM YYYY')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {moment(session.session_time_start).format('hh:mm A')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.00em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {moment(session.session_time_end).format('hh:mm A')}
            </Typography>
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
                {this.props.coursedescription}
              </Typography>
              <br/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.state.instructor}   |  {'$' + this.state.fee.toFixed(2)}
              </Typography>
              <Divider/>
              <Avatar src={this.state.currentAvatarUrl} className={"avatar"}/>               
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
              Based on your selection of:
                <ul>
                  {reasons}
                </ul>
              </Typography>
              <br/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                Sessions:
                <ul>
                  {sessionItems}
                </ul>
              </Typography>
              <br/>
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
                  <h3 className="page-header__title">{this.props.coursename}</h3>
                </div>
              </div>
              <div className="content-container">
                <span>
                  <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                    {this.props.coursedescription}
                  </Typography>
                </span>
               </div>
               <div>
                  <form action="">
                    <label className="statement">This Course Satisfied My Expectations and Learning Goals.</label>
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
                        startIcon={<SaveSharp />}
                        onClick={this.toggleModalWithSave}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Save Rating</Typography></Button>
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
  courserecommendation: state.courserecommendations.find((courserecommendation) => courserecommendation.id === props.id),
  sessions: selectSessions(state.sessions, props.courseid),
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseRecommendation: (id, ratingData) => dispatch(startEditCourseRecommendation(id, ratingData)),
  startRemoveCourseRecommendation: (recommendationId) => dispatch(startRemoveCourseRecommendation(recommendationId)),
  startAddRatingsByUserCourse: (ratingCapture) => dispatch(startAddRatingsByUserCourse(ratingCapture)),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioListItem);