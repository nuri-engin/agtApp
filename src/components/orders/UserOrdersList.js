//Core
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";

//UI
import ProductCard from "../products/ProductCard";
import "./createorder.css"

class UserOrdersList extends Component {
  render () {
      const { auth } = this.props;
      const { userOrders } = this.props.location;
      let allOrders = [];

      if (!auth.uid) return <Redirect to="/signin" />;
      if (userOrders) {
          userOrders.forEach(order => allOrders = order.orders);


          return (
            <div className="give-order container">
              <div>
                  <p>Search/ Filter</p>
              </div>
              <div className="row">
                  <div className="col s5 create-order-card">
                      {allOrders &&
                        allOrders.map(product => {
                            return (
                                <Link to={"/product/" + product.title} key={product.id}>
                                    <ProductCard product={product} />
                                </Link>
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
)(UserOrdersList);