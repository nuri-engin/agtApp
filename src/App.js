//Core
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//UI
import Navbar from "./components/layouts/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import PeriodDetails from "./components/periods/PeriodDetails";
import CreatePeriod from "./components/periods/CreatePeriod";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/period/:id" component={PeriodDetails} />
            <Route exact path="/create" component={CreatePeriod} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
