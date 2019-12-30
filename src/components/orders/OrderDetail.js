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
      if (userOrders && userOrders.length) {
        return (
            <div className="container">
            <h4>Mevcut siparisleriniz!</h4>
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
                <h4>Your don't have any order yet!</h4>
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