//Core
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

//UI
import ProductCard from "../products/ProductCard";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";


class CreateOrder extends Component {
  render () {
    const { products } = this.props;

    return (
      <div className="give-order container">
        <br />
        <button className="btn grey lighten-2 z-depth-0">
          <NavLink to="/">Siparislerinizi tamamlayin.</NavLink>
        </button>
        <br />
        <div>
            <p>Search/ Filter</p>
        </div>
        <div className="row">
            <div className="col s12 m6">
                {products &&
                    products.map(product => {
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
  }
};

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: "products", orderBy: ['createdAt', 'desc']}
  ])
)(CreateOrder);