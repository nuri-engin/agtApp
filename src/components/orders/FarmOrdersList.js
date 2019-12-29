//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";

class FarmOrdersList extends Component {
  render () {
      const { auth } = this.props;
      const { farmOrders } = this.props.location;
      let allFarms = [];
      
      if (!auth.uid) return <Redirect to="/signin" />;
      if (farmOrders) {
        farmOrders.forEach(farm => allFarms.push(farm.id));

        return (
            <div className="give-order container">
              <div>
                  <p>Search/ Filter</p>
              </div>
              <div className="row">
                  <div className="col s5 create-order-card">
                    <h4>Mevcut Siparisi olan Ureticiler</h4>

                      {allFarms &&
                        allFarms.map(farm => {
                            return (
                                <div>
                                    <h5>Uretici: {farm}</h5>
                                </div>
                              );
                          })
                      }
                </div>
              </div>
            </div>
          );
    } else {
        return (
            <div className="container">
                <span>NO DATA </span>
            </div>
        )
    }
  }
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps)
)(FarmOrdersList);