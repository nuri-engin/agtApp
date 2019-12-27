//Core
import React from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const PeriodDetails = props => {
  const { period, auth } = props;

  if (!auth.uid) return <Redirect to="/signin" />;
  if (period) {
    return (
      <div className="container section period-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{period.title}</span>
            <p>{period.content}</p>
            <br/><br/>
            <button>Give Order</button> <button>Your Orders</button>
            <br/> 
            <button>All User Orders</button> <button>All Farm Orders</button>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Olusturan: {period.authorFirstName} {period.authorLastName}
            </div>
            <div> Tarih: {moment(period.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Donemler yukleniyor...</p>
      </div>
    );
  }
};

const mapsStateToProps = (state, ownParams) => {
  const id = ownParams.match.params.id;
  const periods = state.firestore.data.periods;
  const period = periods ? periods[id] : null;
  return {
    period: period,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapsStateToProps),
  firestoreConnect([{ collection: "periods" }])
)(PeriodDetails);
