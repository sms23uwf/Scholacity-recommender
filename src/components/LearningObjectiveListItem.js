import React from 'react';
import Checkbox from './Checkbox';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";

const LearningObjectiveListItem = ({ id, knowledgearea, content, selected, pairingId, selectCallback }) => (
  <div>
    <CardActionArea>
    <Card>
      <CardContent>
        <Typography className={"MuiTypography--content"} style={{ fontSize: '1.75em', fontWeight: `bold`, color: `#000000` }} variant={"h6"} gutterBottom>
          <Checkbox type="checkbox" checked={selected} id={id} name={id} label={content} pairingId={pairingId} onCheckboxChange={(e) => selectCallback(id,content,pairingId,knowledgearea,e)}/>
        </Typography>
      </CardContent>
    </Card>
  </CardActionArea>

  </div>
);

export default LearningObjectiveListItem;