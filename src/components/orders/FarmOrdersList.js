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
      return (
        <div className="give-order container">
          <div>
            <p> Arama / Filtre </p>
          </div>
          <div className="row">
            <div className="col s5 create-order-card">
            <h5>{period.title} dagitim donemi: Siparis Alan Ureticiler...</h5>
              {farmOrders &&
                farmOrders.map((farm, index) => {
                  let farmOrders = [];
                  farm.orders.forEach(order => farmOrders.push(order.title));
                  
                  function count(array_elements) {
                    let countText = [];

                    array_elements.sort();

                    var current = null;
                    var cnt = 0;
                    for (var i = 0; i < array_elements.length; i++) {
                        if (array_elements[i] !== current) {
                            if (cnt > 0) {
                              countText.push(" " + current + ' (' + cnt + ' adet)');
                            }
                            current = array_elements[i];
                            cnt = 1;
                        } else {
                            cnt++;
                        }
                    }
                    if (cnt > 0) {
                      countText.push(" " + current + ' (' + cnt + ' adet)');
                    }

                    return countText;
                }

                  return (
                    <p key={index}>{farm.id}: {count(farmOrders)}</p>
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
