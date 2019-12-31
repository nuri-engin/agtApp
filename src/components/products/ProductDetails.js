//Core
import React from "react";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const ProductDetails = props => {
  const { product, auth } = props;

  if (!auth.uid) return <Redirect to="/signin" />;
  if (product) {
    return (
      <div className="container section product-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{product.title}</span>
            <p>{product.content}</p>
            <br />
            <br />
            <button>
            <Link
                  to={{
                    pathname: "/productdata",
                    product: product
                  }}
                >Urun Bilgilerini Guncelle</Link>
            </button>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Olusturan: {product.authorFirstName} {product.authorLastName}
            </div>
            <div> Tarih: {moment(product.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Urun bilgileri yuklenemedi...</p>
      </div>
    );
  }
};

const mapsStateToProps = (state, ownParams) => {
  const products = state.firestore.data.products;
  let product;

  if (products) {
    Object.keys(products).forEach(key => {
      if (products[key].title === ownParams.match.params.title) {
        product = products[key];
      }
    });
  }

  return {
    product: product,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapsStateToProps),
  firestoreConnect([{ collection: "products" }])
)(ProductDetails);
