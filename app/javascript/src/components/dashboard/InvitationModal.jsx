import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import inviteApi from "../../apis/invite";
import { validator } from "../../helper";
import { defaultErrorState } from "../../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function InvitationModal({ open, handleClose }) {
  const [error, setError] = useState(defaultErrorState);

  const handleModalClose = () => {
    handleClose();
    setError(defaultErrorState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    let validation = validator("email", email);
    if (validation?.error) {
      setError(validation);
    } else {
      try {
        await inviteApi.invite({
          invitation: {
            reciever: email,
          },
        });
        handleModalClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            error={error.error}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={error.message}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Invite
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
