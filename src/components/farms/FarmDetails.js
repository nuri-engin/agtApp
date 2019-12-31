//Core
import React, {Component} from "react";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";

//UI
import ProductCard from "../products/ProductCard";

//Data
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { deleteFarm } from "../../store/actions/farmActions";

class FarmDetails extends Component {
  handleDelete = farm => {
    if (window.confirm("Uretici silinecektir! Onanliyor musunuz?"))  {
      this.props.deleteFarm(farm);
      this.props.history.goBack(); 
    }
  }

  render() {
    const { products, farm, auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    if (farm) {
      return (
        <div className="container section farm-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{farm.title}</span>
              <p>{farm.content}</p>
              <br />
              <br />
              <button>
                <Link
                    to={{
                      pathname: "/productdata",
                      fromFarm: farm.title,
                      product: {
                        productid: farm.farmid + "" + Math.floor(Math.random()*1000+1),
                        farmid: farm.farmid,
                        farmname: farm.title
                      }
                    }}
                  >Yeni Urun</Link>
              </button>
              <button>
                <Link
                      to={{
                        pathname: "/farmdata",
                        fromFarm: farm.title,
                        farm: {
                          farmid: farm.farmid,
                          title: farm.title,
                          content: farm.content
                        }
                      }}
                    >Guncelle</Link>
              </button>
              <button onClick={() => {this.handleDelete(farm)}}>Sil</button>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div> ID: {farm.farmid}</div>
              <div> Olusturan: {farm.authorFirstName} {farm.authorLastName}</div>
              <div> Tarih: {moment(farm.createdAt.toDate()).calendar()}</div>
            </div>
          </div>

          <div className="container section product-details">
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
      );
    } else {
      return (
        <div className="container center">
          <p>Uretici bilgileri yuklenemedi...</p>
        </div>
      );
    }
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

const mapDispatchToProps = dispatch => {
  return {
    deleteFarm: farm => dispatch(deleteFarm(farm))
  };
};

export default compose(
  connect(mapsStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "farms" },
    { collection: "products", orderBy: ["createdAt", "desc"] }
  ])
)(FarmDetails);
