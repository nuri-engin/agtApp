//Core
import React from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { NavLink } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const PeriodDetails = props => {
  const { period, auth } = props;
  
  if (!auth.uid) return <Redirect to="/signin" />;
  if (period) {
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
                <div> Tarih: {moment(period.createdAt.toDate()).calendar()}</div>
              </div>
            </div>
          </div>
        </div>
          <div className="col s12 m5 offset-m1">
            <br/>
            <button className="btn grey lighten-2 z-depth-0">
              <NavLink to="/create-order">Siparis Ver</NavLink>
            </button>
            <br/><br/>
            <button className="btn grey lighten-2 z-depth-0">
              <NavLink to="/order-cart">Siparislerinizi Goruntuleyin</NavLink>
            </button>
            <br/><br/>
            <button className="btn grey lighten-2 z-depth-0">
              <NavLink to="/usersorderslist">Tum Kullanici Siparisleri</NavLink>
            </button>
            <br/><br/>
            <button className="btn grey lighten-2 z-depth-0">
            <NavLink to="/farmorderslist">Tum Uretici Siparisleri</NavLink>
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
  const periods = state.firestore.data.periods ? state.firestore.data.periods : false;
  let period;

  if (periods) {
    Object.keys(periods).forEach(key => {
      if (periods[key].title === ownParams.match.params.title) {
          period = periods[key]
      }
    });
  }  

  return {
    period: period,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapsStateToProps),
  firestoreConnect([{ collection: "periods" }])
)(PeriodDetails);
