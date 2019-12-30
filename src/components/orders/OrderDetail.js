//Core
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";

//UI
import ProductCard from "../products/ProductCard";

class OrderCart extends Component {
  render() {
    const { auth } = this.props;
    const { userOrders, period } = this.props.location;

    if (!auth.uid) return <Redirect to="/signin" />;
    if (userOrders && userOrders.length) {
      return (
        <div className="container">
          <h4>{period.title} dagitim donemi: Mevcut siparisleriniz...</h4>
          <div className="row">
            <div className="col s5">
              {userOrders &&
                userOrders.map(product => {
                  return (
                    <Link to={"/product/" + product.title} key={product.id}>
                      <ProductCard product={product} isOrderCart={false} />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h4>{period ? period.title + ' dagitim donemi: ' : ''} Henuz kayitli bir siparis listeniz yoktur!</h4>
        </div>
      );
    }
  }
}

const mapsStateToProps = (state, ownParams) => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(connect(mapsStateToProps))(OrderCart);
