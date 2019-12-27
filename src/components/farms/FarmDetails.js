//Core
import React from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const FarmDetails = props => {
  const { farm, auth } = props;

  if (!auth.uid) return <Redirect to="/signin" />;
  if (farm) {
    return (
      <div className="container section farm-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{farm.title}</span>
            <p>{farm.content}</p>
            <br/><br/>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Olusturan: {farm.authorFirstName} {farm.authorLastName}
            </div>
            <div> Tarih: {moment(farm.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Ureticiler yukleniyor...</p>
      </div>
    );
  }
};

const mapsStateToProps = (state, ownParams) => {
  const id = ownParams.match.params.id;
  const farms = state.firestore.data.farms;
  const farm = farms ? farms[id] : null;
  return {
    farm: farm,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapsStateToProps),
  firestoreConnect([{ collection: "farms" }])
)(FarmDetails);
