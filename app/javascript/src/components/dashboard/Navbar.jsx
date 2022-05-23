import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import InvitationModal from "./InvitationModal";
// import authApi from "../../apis/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const history = useHistory();

  const handleLogout = () => {
    try {
      authApi.logout();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    } finally {
      history.push("/login");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DirectShifts
            </Typography>
            <Button color="inherit" onClick={handleOpen}>
              INVITE
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <InvitationModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </>
  );
}
