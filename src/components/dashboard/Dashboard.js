//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//UI
// import Notifications from "./Notifications";
import PeriodList from "../periods/PeriodList";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Dashboard extends Component {
  render() {
    const { periods, user_orders, farm_orders, auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <PeriodList periods={periods} user_orders={user_orders} farm_orders={farm_orders} />
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
    periods: state.firestore.ordered.periods,
    user_orders: state.firestore.ordered.user_orders,
    farm_orders: state.firestore.ordered.farm_orders,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: "periods", orderBy: ['createdAt', 'desc']},
    {collection: "notifications", limit: 3, orderBy: ['time', 'desc']},
    {
      collection: 'farm_orders',
      doc: 'february',
      includeDoc: true,
      subcollections: [{ collection: 'farms'}],
      storeAs: "farm_orders"
    },
    {
      collection: 'user_orders',
      doc: 'february',
      includeDoc: true,
      subcollections: [{ collection: 'users'}],
      storeAs: "user_orders"
    },
  ])
)(Dashboard);
