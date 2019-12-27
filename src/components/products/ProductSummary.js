//Core
import React from "react";
import moment from "moment";

const ProductSummary = ({ product }) => {
  return (
    <div className="product-list section">
      <div className="card z-depth-0 product-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{product.title}</span>
          <p>
            Olusturan: {product.authorFirstName} {product.authorLastName}
          </p>
          <p className="grey-text">
            {/* Tarih: {moment(product.createdAt.toDate()).calendar()} */}
            Tarih: {moment().calendar()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
