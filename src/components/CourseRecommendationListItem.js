import React from 'react';
import { connect } from 'react-redux';
import { startSetCourseRecommendations, startEditCourseRecommendation } from '../actions/courseRecommendations';
import { startAddRatingsByUserCourseLO } from '../actions/ratingsByUserCourseLO';
import Modal from './Modal';
import Avatar from '@material-ui/core/Avatar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import selectCourseRecommendations from '../selectors/courserecommendations';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Checkbox, FormControlLabel }  from '@material-ui/core';

class CourseRecommendationListItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showModal: false,
        currentRating: props.rating,
        disposition: props.disposition,
        newDisposition: props.disposition,
        isPortFolio: props.disposition === `Portfolio` ? true : false,
        currentTitle: props.knowledgearea + `: ` + props.coursename,
        currentAvatarUrl: this.setAvatarURL(props.rating),
        newRating: props.rating
      }
  }
  toggleModalWithSave = () => {
    if(this.state.showModal == true)
    {
      this.props.startSetCourseRecommendations();
    }

    this.setDisposition();

    if((this.state.newRating != this.state.currentRating) || (this.state.newDisposition != this.state.disposition))
      this.recordRating(this.props.courserecommendation.id, this.state.newRating, this.state.newDisposition, this.props.courserecommendation.courseid, this.props.courserecommendation.userid, this.props.courserecommendation.learningobjectives);

    this.setState({
      showModal: !this.state.showModal
    });
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      newRating: this.state.currentRating
    });
  }

  onCheckSaveToPortfolio = (e) => {
    console.log(`onCheckSaveToPortfolio`);

    if(e.target.checked===true)
    {
      console.log(`onCheckSaveToPortfolio - target is checked`);
      this.setState({newDisposition: `Portfolio`});
    }
    else
    {
      console.log(`onCheckSaveToPortfolio - target is NOT checked`);
      this.setState({newDisposition: `Undecided`});
    }

  };

  setDispositionBasedOnRating = (rating) => {
    console.log(`isPortolio is ${this.state.isPortFolio}`);
    if(this.state.isPortFolio===true)
      return `Portfolio`;
    
    return `Undecided`;
  }

  setDisposition = () => {
    console.log(`isPortolio is ${this.state.isPortFolio}`);
    if(this.state.isPortFolio===true)
    {
      this.setState({disposition: `Portfolio`});
      return `Portfolio`;
    }

    this.setState({disposition: `Undecided`});
    return `Undecided`;
  }

  handleRatingChange = event => {
    console.log(`newRating is ${this.state.newRating}`);
    console.log(`currentRating is ${this.state.currentRating}`);
    this.setState({newRating: event.target.value});
    console.log(`newRating is ${this.state.newRating}`);
    console.log(`currentRating is ${this.state.currentRating}`);
    console.log(`event.target.value is ${event.target.value}`);
  }

  recordLocalRating = (rating,e) => {
    this.setState({newRating: rating});
  }

  recordRating = (id,rating,disposition,courseid,userid,learningobjectives) => {
    this.setState({currentRating: rating});
    const ratingData = {rating: rating, disposition: disposition};
    this.props.startEditCourseRecommendation(id, ratingData);
    this.setState({currentAvatarUrl: this.setAvatarURL(rating)});

    var loData = {...learningobjectives};

    Object.keys(loData).map((key) => {
      var currentLO = loData[key];
      const ratingCapture = {courseid: courseid, learningobjectiveid: currentLO.learningobjectiveid, userid: userid, rating: rating};
      this.props.startAddRatingsByUserCourseLO(ratingCapture);
    })
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

    var reasonData = {...this.props.learningobjectives};
    const result = Object.keys(reasonData).map((key) => reasonData[key]);

    var reasons = [];
    result.forEach((reason) => (
      reasons.push(<li key={reason.learningobjectiveid}>{reason.content}</li>)
    ));

    return (
      <div>
      <Divider/>
        <CardActionArea onClick={this.toggleModalWithSave}>
          <Card>
            <CardHeader avatar={<Avatar src={this.state.currentAvatarUrl} className={"avatar"}/>} titleTypographyProps={{variant:'h4'}} title={this.state.currentTitle}/>
            <CardContent>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
                {this.props.coursedescription}
              </Typography>
              <br/>
              <Divider/>
              <Typography className={"MuiTypography--content"} variant={"h6"} gutterBottom>
              Based on your selection of:
                <ul>
                  {reasons}
                </ul>
              </Typography>
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
                  <h4 className="page-header__title">{this.props.knowledgearea}:{this.props.coursename}</h4>
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
                    <label className="statement">This Recommendation Fits With a Desired Learning Outcome.</label>
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
                    spacing={3}
                    >
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox type="checkbox"  onChange={(e) => this.onCheckSaveToPortfolio(e)}></Checkbox>
                          }
                          label={
                            <Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>
                              Maintain in Portfolio
                            </Typography>
                          }
                        />
                      </Grid>

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
                          onClick={this.toggleModal}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Cancel</Typography></Button>
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
  courserecommendations: selectCourseRecommendations(state.courserecommendations, state.filters),
  courserecommendation: state.courserecommendations.find((courserecommendation) => courserecommendation.id === props.id),
  filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseRecommendation: (id, ratingData) => dispatch(startEditCourseRecommendation(id, ratingData)),
  startSetCourseRecommendations: () => dispatch(startSetCourseRecommendations()),
  startAddRatingsByUserCourseLO: (ratingCapture) => dispatch(startAddRatingsByUserCourseLO(ratingCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseRecommendationListItem);