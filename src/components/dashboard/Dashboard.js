//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//UI
// import Notifications from "./Notifications";
import PeriodList from "../periods/PeriodList";

class Dashboard extends Component {
  render() {
    const { periods, auth } = this.props;
    
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <PeriodList periods={periods} />
          </div>
          <div className="col s12 m5 offset-m1">
            <p>Notifications</p>
            {/* <Notifications notifications={notifications} /> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    periods: state.firestore.ordered.periods,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: "periods", orderBy: ['createdAt', 'desc']},
    {collection: "notifications", limit: 3, orderBy: ['time', 'desc']}
  ])
)(Dashboard);
