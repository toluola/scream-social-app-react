import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },

  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

const Scream = ({
  classes,
  scream: {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount
  }
}) => {
  dayjs.extend(relativeTime);
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="profile-image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Link to={`/users/${userHandle}`} className="nav-button">
            <Typography variant="h5" color="primary">
              {userHandle}
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {body}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Scream);
