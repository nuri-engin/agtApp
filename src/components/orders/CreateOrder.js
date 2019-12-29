//Core
import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//UI
import ProductCard from "../products/ProductCard";
import "./createorder.css"

class CreateOrder extends Component {
  state = {
    title: "",
    content: ""
  };

  handleChange = e => {
    e.persist();
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render () {
    const { auth, products } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
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
            <div className="col s5 create-order-card">
                {products &&
                    products.map(product => {
                        return (
                            <Link to={"/product/" + product.title} key={product.id}>
                                <ProductCard product={product} isOrderCart={true} />
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