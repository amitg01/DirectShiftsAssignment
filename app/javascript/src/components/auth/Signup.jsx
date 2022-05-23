import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import authApi from "../../apis/auth";
import { setAuthHeaders } from "../../apis/axios";
import { validator } from "../../helper";

const theme = createTheme();

export default function SignupForm() {
  const [emailError, setEmailError] = useState({ error: false, message: "" });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });
  const [firstNameError, setFirstNameError] = useState({
    error: false,
    message: "",
  });
  const [lastNameError, setLastNameError] = useState({
    error: false,
    message: "",
  });

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    if (validateValues()) {
      try {
        await authApi.signup({
          user: { email, password, first_name: firstName, last_name: lastName },
        });
        setAuthHeaders();
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateValues = (email, password, firstName, lastName) => {
    let emailValidation = validator("Email", email);
    let passwordValidation = validator("Password", password);
    let firstNameValidation = validator("First Name", firstName);
    let lastNameValidation = validator("Last Name", lastName);

    if (
      !emailValidation.error &&
      !passwordValidation.error &&
      !firstNameValidation.error &&
      !lastNameValidation.error
    ) {
      return true;
    }
    if (emailValidation.error) {
      setEmailError(emailValidation);
    }
    if (passwordValidation.error) {
      setPasswordError(passwordValidation);
    }
    if (firstNameValidation.error) {
      setFirstNameError(firstNameValidation);
    }
    if (lastNameValidation.error) {
      setLastNameError(lastNameValidation);
    }
    return false;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={firstNameError.error}
                  helperText={firstNameError.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={lastNameError.error}
                  helperText={lastNameError.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError.error}
                  helperText={emailError.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordError.error}
                  helperText={passwordError.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
