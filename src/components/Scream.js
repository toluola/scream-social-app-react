import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { connect } from "react-redux";
import MyButton from "../utils/MyButton";
import DeleteScream from "./DeleteScream";
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";
import ScreamDialog from "./ScreamDialog";

const styles = {
  card: {
    position: "relative",
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
  },
  openDialog,
  user: {
    authenticated,
    credentials: { handle }
  }
}) => {
  dayjs.extend(relativeTime);
  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
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
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {body}
          </Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={openDialog}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
