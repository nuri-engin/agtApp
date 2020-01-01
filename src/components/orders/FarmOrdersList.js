//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";
import TableFarm from "../layouts/TableFarm";

class FarmOrdersList extends Component {
  count = function(array_elements) {
    let countText = [];

    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
      if (array_elements[i] !== current) {
        if (cnt > 0) {
          countText.push(" " + current + " (" + cnt + " adet)");
        }
        current = array_elements[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      countText.push(" " + current + " (" + cnt + " adet)");
    }

    return countText;
  };

  render() {
    const { auth } = this.props;
    const { farmOrders, period } = this.props.location;

    if (!auth.uid) return <Redirect to="/signin" />;
    if (farmOrders && farmOrders.length) {
      return (
        <div className="give-order container">
          <h4>{period.title} dagitim donemi: Siparis Alan Ureticiler...</h4>
          <h5>Ozet Tablo:</h5>
          {farmOrders &&
            farmOrders.map((farm, index) => {
              let farmOrders = [];
              farm.orders.forEach(order => farmOrders.push(order.title));
              return (
                <p key={index}>
                  {farm.id}: {this.count(farmOrders)}
                </p>
              );
            })}
          <br />
          <br />
          <TableFarm farmOrders={farmOrders} />
        </div>
      );
    } else {
      return (
        <div className="container">
          <h4>
            {period ? period.title + " dagitim donemi: " : ""} Henuz siparis alan uretici yoktur!
          </h4>
          return <Redirect to="/" />
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
