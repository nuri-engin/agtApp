//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";

class FarmOrdersList extends Component {
  render() {
    const { auth } = this.props;
    const { farmOrders, period } = this.props.location;

    if (!auth.uid) return <Redirect to="/signin" />;
    if (farmOrders && farmOrders.length) {
      let allFarms = []
      farmOrders.forEach(farm => allFarms.push(farm.id));

      return (
        <div className="give-order container">
          <div>
            <p>Search/ Filter</p>
          </div>
          <div className="row">
            <div className="col s5 create-order-card">
            <h5>{period.title} dagitim donemi: Siparis Alan Ureticiler...</h5>
              {allFarms &&
                allFarms.map((farm, index) => {
                  return (
                    <p key={index}>{farm}</p>
                  );
                })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h4>{period ? period.title + ' dagitim donemi: ' : ''} Henuz siparis alan uretici yoktur!</h4>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(FarmOrdersList);
