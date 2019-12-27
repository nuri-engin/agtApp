//Core
import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

//UI
import ProductSummary from "./ProductSummary";

const ProductList = ({ products }) => {
  const sampleProduct = {
      id: 1,
      title: "Elma",
      content: "Cok kirmizi elma",
      authorFirstName: "Nuri",
      authorLastName: "Engin",
      createdAt: new Date().getTime()
  } 

  return (
    <div className="product container">
      <br />
      <button className="btn grey lighten-2 z-depth-0">
        <NavLink to="/create-product">Yeni Urun Ekle</NavLink>
      </button>
      <div className="row">
        <div className="col s12 m6">
          <Link to={"/product/" + sampleProduct.title} key={sampleProduct.id}>
              <ProductSummary product={sampleProduct} />
          </Link>

          {/* {products &&
            products.map(product => {
              return (
                <Link to={"/product/" + product.title} key={product.id}>
                  <ProductSummary product={product} />
                </Link>
              );
            })} */}
          </div>
          <div className="col s12 m5 offset-m1">
            <p>Search/ Filter</p>
          </div>
        </div>
      </div>
  );
};

export default ProductList;
