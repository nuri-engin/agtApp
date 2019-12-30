//Core
import React from "react";
import moment from "moment";
import { Redirect, Link } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const PeriodDetails = props => {
  const { period, user_orders, farm_orders, profile, auth } = props;
  
  if (!auth.uid) return <Redirect to="/signin" />;
  if (period && user_orders && farm_orders) {
    let currentUserOrders;

    user_orders.forEach((key, index) => {
      if (key.id === profile.firstName + profile.lastName) {
        currentUserOrders = user_orders[index].orders;
      }
    });

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <div className="container section period-details">
              <div className="card z-depth-0">
                <div className="card-content">
                  <span className="card-title">{period.title}</span>
                  <p>{period.content}</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                  <div>
                    Olusturan: {period.authorFirstName} {period.authorLastName}
                  </div>
                  <div>
                    {" "}
                    Tarih: {moment(period.createdAt.toDate()).calendar()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m5 offset-m1">
            <br />
            <button className="btn grey lighten-2 z-depth-0">
              <Link
                  to={{
                    pathname: "/create-order",
                    period: period
                  }}
                >Siparis Ver</Link>
            </button>
            <br />
            <br />
            <button className="btn grey lighten-2 z-depth-0">
              <Link
                to={{
                  pathname: "/orderdetail",
                  userOrders: currentUserOrders,
                  period: period
                }}
              >
                Siparislerinizi Goruntuleyin
              </Link>
            </button>
            <br />
            <br />
            <button className="btn grey lighten-2 z-depth-0">
              <Link
                to={{
                  pathname: "/usersorderslist",
                  userOrders: user_orders,
                  period: period 
                }}
              >
                Tum Kullanici Siparisleri
              </Link>
            </button>
            <br />
            <br />
            <button className="btn grey lighten-2 z-depth-0">
              <Link
                to={{
                  pathname: "/farmorderslist",
                  farmOrders: farm_orders,
                  period: period
                }}
              >
                Tum Uretici Siparisleri
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Donem bilgileri yuklenemedi...</p>
      </div>
    );
  }
};

const mapsStateToProps = (state, ownParams) => {
  const periods = state.firestore.data.periods
    ? state.firestore.data.periods
    : false;
  let period;

  if (periods) {
    Object.keys(periods).forEach(key => {
      if (periods[key].title === ownParams.match.params.title) {
        period = periods[key];
      }
    });
  }

  return {
    period: period,
    user_orders: state.firestore.ordered.user_orders,
    farm_orders: state.firestore.ordered.farm_orders,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapsStateToProps),
  firestoreConnect(props => {
    return [
      { collection: "periods" },
      {
        collection: "farm_orders",
        doc: props.match.params.title,
        includeDoc: true,
        subcollections: [{ collection: "farms" }],
        storeAs: "farm_orders"
      },
      {
        collection: "user_orders",
        doc: props.match.params.title,
        includeDoc: true,
        subcollections: [{ collection: "users" }],
        storeAs: "user_orders"
      }
    ];
  })
)(PeriodDetails);
