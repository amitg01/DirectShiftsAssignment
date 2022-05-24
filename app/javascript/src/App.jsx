import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders, registerIntercepts } from "./apis/axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./components/auth/Login";
import SignupForm from "./components/auth/Signup";
import Dashboard from "./components/dashboard";
import { Loader } from "./common/Loader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthHeaders(setLoading);
    registerIntercepts();
  }, []);

  const NoticeContainer = () => (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <NoticeContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
      </Switch>
    </Router>
  );
};

export default App;
