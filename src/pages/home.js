import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/Scream";

export const HomePage = () => {
  const [getScreams, setGetScreams] = useState([]);
  useEffect(() => {
    async function getAllScreams() {
      const getScream = await axios.get("/screams");
      setGetScreams(getScream.data);
    }
    getAllScreams();
  }, []);

  const originalScreams = getScreams.map(scream => (
    <Scream key={scream.screamId} scream={scream} />
  ));
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {originalScreams}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Content...</p>
      </Grid>
    </Grid>
  );
};
