//Core
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

//UI
import FarmCard from "./FarmCard";


//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class FarmList extends Component {
   render() {
    const { farms } = this.props;

    return (
      <div className="farm container">
        <br />
        <button className="btn grey lighten-2 z-depth-0">
          <NavLink to="/create-farm">Yeni Uretici Ekle</NavLink>
        </button>
        <div className="row">
          <div className="col s12 m6">
            {farms &&
              farms.map(farm => {
                return (
                  <Link to={"/farm/" + farm.title} key={farm.id}>
                    <FarmCard farm={farm} />
                  </Link>
                );
              })}
            </div>
            <div className="col s12 m5 offset-m1">
              <p>Search/ Filter</p>
            </div>
          </div>
        </div>
    );
   }
};

const mapStateToProps = state => {
  return {
    farms: state.firestore.ordered.farms,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: "farms", orderBy: ['createdAt', 'desc']}
  ])
)(FarmList);