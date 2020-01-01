//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";
import { createOrder } from "../../store/actions/orderActions";

//UI
import ProductCard from "../products/ProductCard";

class OrderCart extends Component {
  handleCheckout = (userOrders, period) => {
    this.props.createOrder(userOrders, period);
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const { userOrders, period } = this.props.location;

    if (!auth.uid) return <Redirect to="/signin" />;
    if (userOrders && userOrders.length) {
      return (
        <div className="container">
          <h4>Mevcut siparisleriniz!</h4>
          <button
            onClick={() => {
              if (!period) {
                alert("Dagitim donemi bilgisi bulunamadi! Geri yonlendiriliyorsunuz...");
                return <Redirect to="/" />
              } else {
                this.handleCheckout(userOrders, period);
              }
            }}
          >
            Siparisleri Kaydet ({userOrders.length} Urun)
          </button>
          <div className="row">
            <div className="col s5">
              {userOrders &&
                userOrders.map(product => {
                  return (
                    <ProductCard product={product} key={product.id} isOrderCart={false} />
                  );
                })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h4>Your order cart is Empty!</h4>
          <Redirect to="/create-order" />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrder: (orders, period) => dispatch(createOrder(orders, period))
  };
};

const mapsStateToProps = (state, ownParams) => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(
    mapsStateToProps,
    mapDispatchToProps
  )
)(OrderCart);
