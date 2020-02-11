import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/Scream";
import Profile from "../components/Profile";
import { getScreams } from "../redux/actions/dataActions";
import ScreamSkeleton from "../utils/ScreamSkeleton";

const HomePage = ({ getScreams, data: { screams, loading } }) => {
  useEffect(() => {
    getScreams();
  }, [getScreams]);

  const originalScreams = !loading ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <ScreamSkeleton />
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {originalScreams}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getScreams }
)(HomePage);
