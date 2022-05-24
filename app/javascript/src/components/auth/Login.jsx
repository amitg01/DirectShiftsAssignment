import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import authApi from "../../apis/auth";
import { validator } from "../../helper";
import { defaultErrorState } from "../../constants";

const theme = createTheme();

export default function LoginForm() {
  const [emailError, setEmailError] = useState(defaultErrorState);
  const [passwordError, setPasswordError] = useState(defaultErrorState);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (validateValues(email, password)) {
      try {
        const response = await authApi.login({
          user: {
            email,
            password,
          },
        });
        if (response.status === 200) {
          window.location.href = "/";
          localStorage.setItem(
            "DirectShiftsUser",
            JSON.stringify(response.data.user)
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateValues = (email, password) => {
    let emailValidation = validator("email", email);
    let passwordValidation = validator("password", password);
    if (!emailValidation.error && !passwordValidation.error) {
      return true;
    }
    if (emailValidation.error) {
      setEmailError(emailValidation);
    }
    if (passwordValidation.error) {
      setPasswordError(passwordValidation);
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              error={emailError.error}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={emailError.message}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={passwordError.error}
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={passwordError.message}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
