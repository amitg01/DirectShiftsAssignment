import React from "react";
import Navbar from "./Navbar";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Typography variant="h3" component="h2">
            Welcome To DirectShifts
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
