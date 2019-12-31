import React from 'react';
import { connect } from 'react-redux';
import { startSetCourseRecommendations, startEditCourseRecommendation, startRemoveCourseRecommendation } from '../actions/courseRecommendations';
import { startAddRatingsByUserCourseLO } from '../actions/ratingsByUserCourseLO';
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
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import selectCourseRecommendations, {findExistingCourseRecommendation} from '../selectors/courserecommendations';
import { Checkbox, FormControlLabel }  from '@material-ui/core';

const checkBoxStyles = theme => ({
  root: {
    '&$checked': {
      color: '#3D70B2',
    },
  },
  checked: {},
 })

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

class PortfolioListItem extends React.Component {
  constructor(props){
      super(props);
      console.log(`disposition is ${props.disposition}`);
      this.state = {
        showModal: false,
        disposition: props.disposition,
        newDisposition: props.disposition,
        isPortFolio: props.disposition === `Portfolio` ? true : false,
        currentRating: props.rating,
        currentTitle: props.knowledgearea + `: ` + props.coursename,
        currentAvatarUrl: this.setAvatarURL(props.rating),
        newRating: props.rating,
        itemIsKeeper: true,
        recommendationPairing: 0
      }
  }
  toggleModalWithSave = () => {
    if(this.state.showModal == true)
    {
      this.props.startSetCourseRecommendations();
    }

    if((this.state.newRating != this.state.currentRating) || (this.state.newDisposition != this.state.disposition))
      this.recordRating(this.props.courserecommendation.id, this.state.newRating, this.state.newDisposition, this.props.courserecommendation.courseid, this.props.courserecommendation.userid, this.props.courserecommendation.learningobjectives);

      if(this.state.itemIsKeeper == false)
      {
        this.props.startRemoveCourseRecommendation(this.state.recommendationPairing);
        this.props.startSetCourseRecommendations();
      }

    this.setState({
      showModal: !this.state.showModal
    });
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
  }

  onCheckSaveToPortfolio = (recommendationPairing,keeperCount,e) => {
    console.log(`onCheckSaveToPortfolio`);

    if(e.target.checked===true)
    {
      console.log(`onCheckSaveToPortfolio - target is checked`);
      this.setState({isPortFolio: true});
      this.setState({newDisposition: `Portfolio`});
    }
    else
    {
      console.log(`onCheckSaveToPortfolio - target is NOT checked`);

      this.setState({isPortFolio: false});
      this.setState({newDisposition: `Undecided`});

      // put a check here to see if any remaining LO associated with this former portfolio item
      // if not, startRemoveCourseRecommendation

      console.log(`keeperCount is ${keeperCount}`);
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

    const recommendationPairing = {id: this.props.id};

    var keeperData = {...this.props.learningobjectives};
    const keeperResult = Object.keys(keeperData).map((key) => keeperData[key]);
    var keepers = [];
    keeperResult.forEach((keeper) => (
      keepers.push(<li key={keeper.learningobjectiveid}>{keeper.content}</li>)
     ));

    var keeperCount = keepers.length;

    var reasonData = {...this.props.portfolioobjectives};
    const result = Object.keys(reasonData).map((key) => reasonData[key]);

    var reasons = [];
    result.forEach((reason) => (
     reasons.push(<li key={reason.learningobjectiveid}>{reason.content}</li>)
    ));

    return (
      <div>
      <Divider/>
        <CardActionArea onClick={this.toggleModal}>
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
                  <h3 className="page-header__title">{this.props.knowledgearea}:{this.props.coursename}</h3>
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
                        <CustomCheckbox type="checkbox" checked={this.state.isPortFolio} onChange={(e) => { if (window.confirm('Are you sure you wish to remove this item from the Portfolio?')) this.onCheckSaveToPortfolio(recommendationPairing,keeperCount,e)}}></CustomCheckbox>
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
                      onClick={this.toggleModalWithCancel}><Typography style={{ fontSize: '1.5em', fontWeight: `bold`, color: `#000000` }}>Cancel</Typography></Button>
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
  courserecommendation: state.courserecommendations.find((courserecommendation) => courserecommendation.id === props.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCourseRecommendation: (id, ratingData) => dispatch(startEditCourseRecommendation(id, ratingData)),
  startSetCourseRecommendations: () => dispatch(startSetCourseRecommendations()),
  startRemoveCourseRecommendation: (recommendationId) => dispatch(startRemoveCourseRecommendation(recommendationId)),
  startAddRatingsByUserCourseLO: (ratingCapture) => dispatch(startAddRatingsByUserCourseLO(ratingCapture))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioListItem);