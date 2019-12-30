//Core
import React, {Component} from "react";
import { Redirect, Link } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";
import { createOrder } from "../../store/actions/orderActions";

//UI
import ProductCard from "../products/ProductCard";

class OrderCart extends Component {
    handleCheckout = userOrders => {
      this.props.createOrder(userOrders);
      this.props.history.push("/");
    };

    render() {
      const {auth } = this.props;
      const {userOrders} = this.props.location;
      console.log("userOrders", userOrders)
      if (!auth.uid) return <Redirect to="/signin" />;
      if (userOrders && userOrders.length) {
        return (
          <div className="container">
          <h4>Mevcut siparisleriniz!</h4>
          <button onClick={() => {this.handleCheckout(userOrders)}}> Siparisleri Gonder </button>
          <div className="row">
          <div className="col s5">
              {userOrders &&
                  userOrders.map(product => {
                      return (
                          <Link to={"/product/" + product.title} key={product.id}>
                              <ProductCard product={product} isOrderCart={false}/>
                          </Link>
                      );
                  })
              }
      </div>
      </div>
          
      </div>
    )
          
      } else {
          return (
            <div className='container'>
                <h4>Your order cart is Empty!</h4>
                <Redirect to="/create-order" />
            </div>
            
          )
      }
    }
};

const mapDispatchToProps = dispatch => {
  return {
    createOrder: orders => dispatch(createOrder(orders))
  };
};

const mapsStateToProps = (state, ownParams) => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapsStateToProps, mapDispatchToProps)
)(OrderCart);