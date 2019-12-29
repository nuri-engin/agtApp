//Core
import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";

//UI
import ProductCard from "./ProductCard";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";


class ProductList extends Component {
  render () {
    const { auth, products } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="product container">
        <br />
        <button className="btn grey lighten-2 z-depth-0">
          <NavLink to="/create-product">Yeni Urun Ekle</NavLink>
        </button>
        <div className="row">
          <div className="col s12 m6">
            {products &&
              products.map(product => {
                return (
                  <Link to={"/product/" + product.title} key={product.id}>
                    <ProductCard product={product} />
                  </Link>
                );
              })}
          </div>
          <div className="col s12 m5 offset-m1">
            <p>Search/ Filter</p>
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
)(ProductList);