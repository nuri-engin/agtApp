//Core
import React, {Component} from "react";
import { Redirect, Link } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";

//UI
import ProductCard from "../products/ProductCard";

class OrderCart extends Component {
  render() {
      const {auth } = this.props;
      const {userOrders} = this.props.location;
      
      if (!auth.uid) return <Redirect to="/signin" />;
      if (userOrders) {
          return (
                <div className="container">
                <h4>You current order list!</h4>
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

const mapsStateToProps = (state, ownParams) => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapsStateToProps)
)(OrderCart);
