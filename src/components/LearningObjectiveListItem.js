import React from 'react';
import Checkbox from './Checkbox';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const LearningObjectiveListItem = ({ id, knowledgearea, content, selected, pairingId, isRegistered, selectCallback }) => (
  <div>
    <CardActionArea>
      <Card>
        <CardContent>
          <Typography className={"MuiTypography--content"} style={{ fontSize: '1.75em', fontWeight: `bold`, color: `#000000` }} variant={"h6"} gutterBottom>
            <Checkbox type="checkbox" id={id} checked={selected} label={content} pairingId={pairingId} onCheckboxChange={(e) => selectCallback(id,content,pairingId,knowledgearea,isRegistered, e)}/>
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  </div>
);

export default LearningObjectiveListItem;