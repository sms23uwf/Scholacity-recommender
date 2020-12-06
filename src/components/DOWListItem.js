import React from 'react';
import CreateSvgIcon from "@material-ui/icons/utils/createSvgIcon";
import { connect } from 'react-redux';
import { startAddCourseSelection, startEditCourseSelection } from '../actions/courseSelections';
import { startAddUserTimeInModal } from '../actions/timeInModal';
import { startAddRegistrationToUser } from '../actions/registrations';
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
import { firebase } from '../firebase/firebase';
import moment from 'moment/moment'
import { Work, ShoppingCart, ClearSharp, DateRangeSharp } from '@material-ui/icons';

class DOWListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        instructor: props.instructor,
        fee: props.fee,
        disposition: props.registrationId === 0 ? 'Open' : 'Registered',
        newDisposition: props.registrationId === 0 ? 'Open' : 'Registered',
        isRegistered: props.registrationId === 0 ? false : true,
        isRegistrationApproved: props.registration_status == 'approved',
        isInCart: props.selectionId === 0 ? false : true,
        courseid: props.id,
        knowledeAreaId: props.knowledgeareaid,
        currentTitle: props.name,
        currentRating: 0,
        currentDescription: props.description,
        currentAvatarUrl: this.setAvatarURL(props.registrationId === 0 ?  props.selectionId === 0 ? 'Open' : 'Cart' : props.registration_status === 'approved' ? 'approved' : 'approved'),
        timeEnteredModal: Date.now(),
        userid: firebase.auth().currentUser.uid
      }
  }
  
  toggleModalWithSaveToCart = () => {

    if(this.state.showModal == true)
    {
      const userCourse = {
        userid: this.state.userid, 
        courseid: this.state.courseid, 
        disposition: 'Cart',
        counter: '1',
        rating: 0,
        knowledgearea: this.state.knowledeAreaId,
        coursename: this.state.currentTitle,
        coursedescription: this.state.currentDescription,
        instructor: this.state.instructor,
        fee: this.state.fee
      };
  
      this.props.startAddCourseSelection(userCourse);

    }

    this.setState({
      showModal: !this.state.showModal,
      disposition: 'Cart',
      currentAvatarUrl: this.setAvatarURL('Cart'),
      isInCart: true
    });

    this.recordTimeInModal('add to cart', this.state.currentRating);
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

  toggleModalWithRegister = () => {

    if(this.state.showModal == true)
    {
      const registrationData = {courseid: this.state.courseid, 
        course_name: this.state.currentTitle, 
        course_description: this.state.currentDescription,
        rating: 0,
        course_instructor: this.state.instructor, 
        course_fee: this.state.fee, 
        userid: this.state.userid, 
        user_email: firebase.auth().currentUser.email, 
        registration_status: 'approved'};

      this.props.startAddRegistrationToUser(registrationData);

      const userCourse = {
        userid: this.state.userid, 
        courseid: this.state.courseid, 
        disposition: 'Registered',
        counter: '1',
        rating: 0,
        knowledgearea: this.state.knowledeAreaId,
        coursename: this.state.currentTitle,
        coursedescription: this.state.currentDescription,
        instructor: this.state.instructor,
        fee: this.state.fee
      };
  
      this.props.startAddCourseSelection(userCourse);

    }

    this.setState({
      showModal: !this.state.showModal,
      disposition: 'approved',
      isRegistered: true,
      currentAvatarUrl: this.setAvatarURL('approved')
    });
    this.recordTimeInModal('register', this.state.currentRating);
  }

  setAvatarURL = (status) => {
    {
      switch(status) {
        case 'Open':
          return '/images/noun_date_range.png';
        case `Cart`:
            return `/images/noun_light_bulb.png`;
        case `requested`:
          return `/images/shopping-cart.png`;
        case `approved`:
            return `/images/shopping-cart.png`;
        default:
            return '/images/noun_date_range.png';
      }
    }
  }

  render() {

    const LightBulbOutline = CreateSvgIcon(
      <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
      <g id="line">
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="m52.55 23.75c0 3.985-1.785 5.908-3.754 10.5-0.5028 1.172-4.211 13.38-4.211 13.38h-17.17s-2.981-11.67-3.546-12.62c-2.37-3.998-4.419-6.91-4.419-11.26 0-9.141 7.41-16.55 16.55-16.55 9.141 0 16.55 7.41 16.55 16.55z"/>
        <line x1="36" x2="36" y1="47.22" y2="35.28" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
        <line x1="41.97" x2="30.03" y1="35.28" y2="35.28" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.696" d="m44.16 58.79c0 3.24-3.651 5.867-8.155 5.867-4.504 0-8.155-2.627-8.155-5.867z"/>
        <line x1="27.99" x2="44.01" y1="54.98" y2="51.51" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.965"/>
        <line x1="38.2" x2="43.98" y1="56.07" y2="54.89" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
        <line x1="28.02" x2="33.8" y1="51.6" y2="50.42" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
      </g>
    </svg>
    );
    
    const NounLightBulb = CreateSvgIcon(
      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xml-space="preserve">
        <g>
          <path d="M65.406,88.371h-2.391V79.26l2.957-3.643c0.16-0.197,0.248-0.445,0.248-0.699v-6.363l5.787-10.16   c2.355-3.949,3.602-8.479,3.602-13.098c0-6.84-2.664-13.271-7.5-18.107C63.271,22.353,56.842,19.688,50,19.688   c-6.841,0-13.271,2.664-18.108,7.501c-4.837,4.836-7.5,11.268-7.5,18.107c0,4.619,1.245,9.148,3.6,13.098l5.788,10.16v6.363   c0,0.254,0.088,0.502,0.249,0.699l2.956,3.643v9.111h-2.389c-0.615,0-1.113,0.498-1.113,1.111c0,0.615,0.498,1.113,1.113,1.113   h2.389v2.922c0,0.615,0.498,1.113,1.113,1.113h1.845c0.003,0.01,0.007,0.018,0.011,0.027c0.008,0.021,0.017,0.045,0.026,0.066   c0.037,0.096,0.074,0.191,0.112,0.289c0.012,0.031,0.024,0.063,0.036,0.094c0.038,0.098,0.075,0.197,0.113,0.299   c0.008,0.023,0.017,0.045,0.025,0.068c0.048,0.127,0.095,0.256,0.144,0.389c0,0,0,0.002,0.001,0.002   c0.046,0.127,0.092,0.254,0.138,0.383c0.012,0.033,0.023,0.066,0.035,0.1c0.036,0.102,0.073,0.205,0.109,0.309   c0.013,0.037,0.026,0.074,0.04,0.113c0.041,0.115,0.081,0.232,0.122,0.352c0.007,0.02,0.014,0.039,0.021,0.059   c0,0.002,0,0.002,0,0.002l0.082,0.238c0.077,0.225,0.266,0.391,0.497,0.438l0.248,0.051c0.446,0.094,0.894,0.178,1.344,0.256   c1.286,0.221,2.586,0.379,3.883,0.477c0.065,0.006,0.132,0.012,0.197,0.016c0.024,0.002,0.05,0.004,0.075,0.006   c0.807,0.055,1.625,0.088,2.432,0.094c0.006,0,0.013,0,0.019,0h0.001c0.117,0.002,0.233,0.002,0.35,0.002   c0.117,0,0.233,0,0.351-0.002c0.864-0.006,1.739-0.041,2.604-0.104c0.049-0.004,0.098-0.01,0.145-0.012   c1.742-0.133,3.492-0.379,5.201-0.732l0.248-0.051c0.23-0.047,0.42-0.215,0.496-0.438l0.082-0.24   c0.049-0.139,0.096-0.275,0.143-0.41c0.014-0.039,0.027-0.078,0.043-0.119c0.033-0.098,0.068-0.193,0.102-0.289   c0.014-0.041,0.029-0.082,0.043-0.121c0.039-0.109,0.078-0.219,0.117-0.326c0.008-0.02,0.016-0.039,0.021-0.059   c0.047-0.125,0.092-0.248,0.137-0.369c0.014-0.035,0.025-0.068,0.039-0.104c0.033-0.088,0.064-0.174,0.098-0.26   c0.016-0.041,0.031-0.08,0.045-0.119c0.033-0.086,0.066-0.172,0.1-0.256c0.012-0.031,0.025-0.064,0.037-0.096   c0.002-0.008,0.006-0.014,0.008-0.021h1.846c0.613,0,1.111-0.498,1.111-1.113v-2.922h2.391c0.613,0,1.111-0.498,1.111-1.113   C66.518,88.869,66.02,88.371,65.406,88.371z M38.986,78.076c-0.092-0.123-0.208-0.225-0.342-0.301l-2.639-3.252V68.91h9.426h9.137   h9.428v5.613l-2.639,3.252c-0.135,0.076-0.25,0.178-0.344,0.301H38.986z M53.697,56.535c-0.232-0.094-0.482-0.152-0.744-0.17   v-2.563c0-0.434-0.113-0.84-0.313-1.193l4.814-9.46l1.068,0.395L53.697,56.535z M49.497,52.689h1.008   c0.336,0,0.636,0.15,0.841,0.385c0.008,0.012,0.018,0.021,0.025,0.033c0.154,0.189,0.246,0.432,0.246,0.695v2.557h-3.234v-2.557   C48.383,53.189,48.882,52.689,49.497,52.689z M51.641,51.635c-0.34-0.178-0.726-0.279-1.136-0.279h-0.674l-1.179-9.913l7.459,1.407   L51.641,51.635z M48.511,51.563c-0.86,0.379-1.463,1.24-1.463,2.24v2.563c-0.262,0.018-0.512,0.076-0.745,0.17l-4.821-12.981   l5.831-2.06L48.511,51.563z M46.099,58.807c0-0.613,0.499-1.111,1.112-1.111h0.505h4.569h0.504c0.613,0,1.113,0.498,1.113,1.111   v8.768h-7.803V58.807z M54.797,57.41l5.197-13.995c0.006-0.011,0.01-0.021,0.016-0.033c0.004-0.011,0.006-0.022,0.01-0.033   l0.451-1.218c0.129-0.346-0.047-0.73-0.393-0.858c-0.346-0.129-0.73,0.048-0.857,0.394l-0.232,0.626l-0.922-0.341l0.268-0.529   c0.168-0.328,0.037-0.73-0.291-0.897s-0.73-0.036-0.898,0.292l-0.402,0.794l-8.256-1.558l-0.107-0.903   c-0.044-0.366-0.376-0.629-0.742-0.584c-0.366,0.043-0.627,0.375-0.584,0.741l0.099,0.828l-6.135,2.167l-0.236-0.636   c-0.128-0.346-0.513-0.522-0.858-0.394c-0.346,0.128-0.521,0.513-0.394,0.858l0.407,1.096c0.005,0.051,0.016,0.103,0.034,0.152   c0.02,0.057,0.048,0.106,0.08,0.153l5.154,13.878c-0.277,0.396-0.44,0.879-0.44,1.396v8.768h-8.981c0,0-0.001-0.002-0.002-0.002   l-5.86-10.289c-0.004-0.006-0.008-0.012-0.012-0.02c-2.153-3.607-3.292-7.745-3.292-11.967c0-12.894,10.49-23.384,23.384-23.384   s23.384,10.49,23.384,23.384c0,4.222-1.139,8.359-3.293,11.967c-0.004,0.008-0.008,0.014-0.012,0.02L64.221,67.57   c0,0.002-0.002,0.004-0.002,0.004h-8.982v-8.768C55.236,58.289,55.074,57.807,54.797,57.41z M57.234,95.852   c-1.465,0.279-2.955,0.473-4.439,0.58c-0.818,0.061-1.646,0.094-2.462,0.1c-0.222,0.002-0.442,0.002-0.664,0   c-0.792-0.006-1.596-0.037-2.388-0.094c-1.509-0.105-3.024-0.303-4.514-0.586c-0.269-0.762-0.528-1.461-0.784-2.111h16.035   C57.762,94.391,57.502,95.09,57.234,95.852z M60.791,92.406h-0.818h-0.666H40.693h-0.665h-0.82V79.412h21.582V92.406z"></path>
          <path d="M52.334,61.984c-0.742-0.301-1.527-0.455-2.333-0.455s-1.592,0.154-2.333,0.455c-0.228,0.092-0.338,0.352-0.245,0.58   c0.093,0.227,0.353,0.336,0.58,0.244c0.635-0.258,1.307-0.389,1.999-0.389s1.365,0.131,1.998,0.389   c0.057,0.021,0.113,0.033,0.168,0.033c0.176,0,0.342-0.105,0.412-0.277C52.672,62.336,52.563,62.076,52.334,61.984z"></path>
          <path d="M57.555,74.473H42.446c-0.246,0-0.445,0.199-0.445,0.445c0,0.244,0.199,0.443,0.445,0.443h15.108   c0.246,0,0.445-0.199,0.445-0.443C58,74.672,57.801,74.473,57.555,74.473z"></path>
          <path d="M50,16.351c0.491,0,0.89-0.398,0.89-0.89V2.467c0-0.491-0.398-0.89-0.89-0.89s-0.89,0.398-0.89,0.89v12.994   C49.111,15.952,49.509,16.351,50,16.351z"></path>
          <path d="M37.562,18.155c0.144,0.34,0.473,0.544,0.82,0.544c0.115,0,0.233-0.022,0.346-0.07c0.453-0.191,0.665-0.714,0.473-1.166   L34.143,5.494c-0.191-0.453-0.713-0.665-1.166-0.474c-0.453,0.191-0.665,0.714-0.473,1.166L37.562,18.155z"></path>
          <path d="M71.727,65.766c-0.348-0.348-0.91-0.348-1.258,0s-0.348,0.91,0,1.258l9.188,9.188c0.174,0.174,0.402,0.262,0.629,0.262   c0.229,0,0.457-0.088,0.631-0.262c0.348-0.348,0.348-0.91,0-1.258L71.727,65.766z"></path>
          <path d="M28.273,24.829c0.174,0.174,0.401,0.261,0.629,0.261c0.228,0,0.456-0.087,0.629-0.261c0.348-0.348,0.348-0.911,0-1.259   l-9.188-9.188c-0.348-0.347-0.911-0.347-1.258,0c-0.348,0.348-0.348,0.911,0,1.259L28.273,24.829z"></path>
          <path d="M89.801,61.152l-11.99-5.008c-0.453-0.189-0.975,0.023-1.164,0.479c-0.189,0.453,0.023,0.975,0.479,1.164l11.988,5.008   c0.113,0.047,0.229,0.068,0.344,0.068c0.348,0,0.68-0.205,0.822-0.547C90.469,61.863,90.254,61.342,89.801,61.152z"></path>
          <path d="M10.599,30l11.452,4.783c0.112,0.047,0.229,0.069,0.343,0.069c0.348,0,0.679-0.206,0.821-0.547   c0.189-0.454-0.024-0.976-0.478-1.165l-11.452-4.783c-0.454-0.189-0.975,0.024-1.165,0.479C9.931,29.289,10.146,29.811,10.599,30z"></path>
          <path d="M92.83,44.407H79.836c-0.49,0-0.889,0.398-0.889,0.89s0.398,0.89,0.889,0.89H92.83c0.492,0,0.891-0.398,0.891-0.89   S93.322,44.407,92.83,44.407z"></path>
          <path d="M21.055,45.297c0-0.491-0.398-0.89-0.89-0.89H7.17c-0.491,0-0.89,0.398-0.89,0.89s0.399,0.89,0.89,0.89h12.995   C20.656,46.187,21.055,45.788,21.055,45.297z"></path>
          <path d="M76.668,34.025c0.145,0.34,0.475,0.544,0.82,0.544c0.117,0,0.234-0.023,0.348-0.07l11.969-5.06   c0.451-0.191,0.664-0.713,0.473-1.166s-0.713-0.664-1.166-0.474l-11.969,5.06C76.689,33.051,76.477,33.572,76.668,34.025z"></path>
          <path d="M23.332,56.568c-0.191-0.453-0.713-0.664-1.166-0.473l-11.969,5.059c-0.453,0.191-0.665,0.713-0.473,1.166   c0.144,0.34,0.473,0.543,0.82,0.543c0.115,0,0.233-0.021,0.346-0.07l11.969-5.059C23.312,57.543,23.523,57.021,23.332,56.568z"></path>
          <path d="M71.098,25.09c0.229,0,0.455-0.087,0.629-0.261l9.189-9.188c0.348-0.348,0.348-0.911,0-1.259   c-0.348-0.347-0.912-0.347-1.26,0l-9.188,9.188c-0.348,0.348-0.348,0.911,0,1.259C70.643,25.003,70.869,25.09,71.098,25.09z"></path>
          <path d="M28.273,65.766l-9.188,9.188c-0.348,0.348-0.348,0.91,0,1.258c0.174,0.174,0.401,0.262,0.629,0.262   c0.228,0,0.455-0.088,0.629-0.262l9.188-9.188c0.348-0.348,0.348-0.912,0-1.258C29.185,65.418,28.621,65.418,28.273,65.766z"></path>
          <path d="M61.271,18.629c0.113,0.048,0.232,0.07,0.348,0.07c0.346,0,0.676-0.204,0.82-0.544l5.059-11.969   c0.191-0.452-0.021-0.975-0.475-1.166s-0.975,0.021-1.166,0.474l-5.059,11.968C60.607,17.915,60.82,18.438,61.271,18.629z"></path>
        </g>
      </svg>
      );
      
    const sessionItems = this.props.sessions.map((session) =>
      <li key={session.session_number}>
        <Grid
          justify="flex-start" 
          flex-direction="column"
          container 
          spacing={1}
        >

          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {session.session_number}
            </Typography>
          </Grid>

          <Grid item>
            <Typography type="body2" style={{ fontFamily: 'Lucida Console', fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
            {session.DOW.padEnd(9,` `)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
              {moment(session.session_date).format('DD MMM YYYY')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
              {moment(session.session_time_start).format('hh:mm A')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>
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
            <CardHeader avatar={<Avatar src={this.state.currentAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle}/>
            <CardContent>
              <Typography style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }} gutterBottom>
                {this.state.currentDescription}
              </Typography>
              <br/>
              <Typography style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }} gutterBottom>
                {this.state.instructor}   |  {'$' + this.state.fee.toFixed(2)}
              </Typography>
              <br/>
              <Divider/>
              <Typography type="body2" style={{ fontSize: '1.25em', fontWeight: `normal`, color: `#000000`, textAlign: `left` }}>Sessions:</Typography>
                <ul>
                  {sessionItems}
                </ul>
              <br/>
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
                  <Typography style={{ fontSize: '1.25em', fontWeight: `bold`, color: `#000000`, textAlign: `left` }} gutterBottom>
                    {this.props.description}
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
                              hidden={this.state.isRegistered || this.state.isInCart}
                              color="primary"
                              aria-label="Save"
                              style={{fontWeight: "bold"}}
                              title="Save"
                              startIcon={<NounLightBulb />}
                              onClick={this.toggleModalWithSaveToCart}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Save</Typography>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="inherit"
                              aria-label="Cancel"
                              style={{fontWeight: "bold"}}
                              title="Cancel"
                              startIcon={this.state.isRegistered || this.state.isInCart ? "" : <ClearSharp />}
                              onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>{this.state.isRegistered || this.state.isInCart ? "OK" : "Cancel"}</Typography>
                            </Button>
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
  sessions: selectSessions(state.sessions, props.id),
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseSelection: (id, ratingData) => dispatch(startEditCourseSelection(id, ratingData)),
  startAddCourseSelection: (userCourse) => dispatch(startAddCourseSelection(userCourse)),
  startAddRegistrationToUser: (registrationData) => dispatch(startAddRegistrationToUser(registrationData)),
  startAddRatingsByUserCourseLO: (ratingCapture) => dispatch(startAddRatingsByUserCourseLO(ratingCapture)),
  startAddUserTimeInModal: (timeInModalCapture) => dispatch(startAddUserTimeInModal(timeInModalCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(DOWListItem);