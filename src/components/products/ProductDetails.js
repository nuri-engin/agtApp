//Core
import React, {Component} from "react";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { deleteProduct } from "../../store/actions/productActions";

class ProductDetails extends Component {
  handleDelete = product => {
    if (window.confirm("Urunu silinecektir! Onanliyor musunuz?"))  {
      this.props.deleteProduct(product);
      this.props.history.goBack(); 
    }
  }

  render() {
    const { product, auth } = this.props;

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
                    >Guncelle</Link>
              </button>

              <button onClick={() => {this.handleDelete(product)}}>Sil</button>
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

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: product => dispatch(deleteProduct(product))
  };
};

export default compose(
  connect(mapsStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "products" }])
)(ProductDetails);
