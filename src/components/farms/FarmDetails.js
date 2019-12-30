//Core
import React from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

//UI
import ProductCard from "../products/ProductCard";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const FarmDetails = props => {
  const { products, farm, auth } = props;

  if (!auth.uid) return <Redirect to="/signin" />;
  if (farm) {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <div className="container">
              <h3 className="card-title">{farm.title}</h3>
              <h5>{farm.content}</h5>

              Olusturan: {farm.authorFirstName} {farm.authorLastName}
              <br />
              Tarih: {moment(farm.createdAt.toDate()).calendar()}
              <br /><br /><br />
            </div>
            <div className="container">
              <h5> Ureticiye ait urunler: </h5>
              {products &&
                products.map(product => {
                  return (
                    <Link
                      to={"/product/" + product.title}
                      key={product.productid}
                    >
                      <ProductCard product={product} />
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="col s12 m5 offset-m1">
            <button>Edit Farm</button>
            <br />
            <button>
              <NavLink to="/create-product">Yeni Urun Ekle</NavLink>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Uretici bilgileri yuklenemedi...</p>
      </div>
    );
  }
};

const mapsStateToProps = (state, ownParams) => {
  const farms = state.firestore.data.farms;
  const products = state.firestore.data.products;

  let farm,
    farmId,
    farmProducts = [];

  if (farms) {
    Object.keys(farms).forEach(key => {
      if (farms[key].title === ownParams.match.params.title) {
        farm = farms[key];
        farmId = farms[key].farmid;
      }
    });
  }

  if (products) {
    Object.keys(products).forEach(key => {
      if (farmId === products[key].farmid) {
        farmProducts.push(products[key]);
      }
    });
  }

  return {
    farm: farm,
    products: farmProducts,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapsStateToProps),
  firestoreConnect([
    { collection: "farms" },
    { collection: "products", orderBy: ["createdAt", "desc"] }
  ])
)(FarmDetails);
