import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./container/Login";
import Home from "./container/Home";
import ProtectedRoute from "./container/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute>
          <Route exact path="/home" component={Home} />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

export default App;
