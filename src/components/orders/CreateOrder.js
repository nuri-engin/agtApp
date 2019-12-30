//Core
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//UI
import ProductCard from "../products/ProductCard";
import "./createorder.css";

class CreateOrder extends Component {
  state = {
    userOrders: [],
    item_count: 0
  };

  handleAddToCard = product => {
    this.setState(state => {
      const userOrders = [...state.userOrders, product];

      return {
        userOrders,
        item_count: this.state.item_count + 1 
      };
    });
  };

  render() {
    const { auth, products } = this.props;
    const { period } = this.props.location;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="give-order container">
        <br />
        {period ? (
          <button className="btn grey lighten-2 z-depth-0">
          <Link
            to={{
              pathname: "/ordercart",
              period: period,
              userOrders: this.state.userOrders
            }}
          >
            Sepetiniz ({this.state.item_count} Urun) 
          </Link>
        </button>
        ) : (
          <Redirect to="/" />
        )}
        <br />
        <div>
          <p>ARAMA / FILTRE</p>
        </div>
        <div className="row">
          <div className="col s5 create-order-card">
            {products &&
              products.map(product => {
                return (
                  <Link to={"/product/" + product.title} key={product.id}>
                    <ProductCard
                      product={product}
                      isOrderCart={true}
                      handleAddToCard={this.handleAddToCard}
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "products", orderBy: ["createdAt", "desc"] }])
)(CreateOrder);
