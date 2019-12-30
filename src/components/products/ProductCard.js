//Core
import React from "react";
import moment from "moment";

const ProductCard = ({ product, isOrderCart, handleAddToCard }) => {
  const showButtons = isOrderCart ? (
    <div>
      <button onClick={e => {
        e.preventDefault();
        handleAddToCard(product)
      }}>Sepete Ekle</button>
    </div>
  ) : "";

  return (
    <div className="product-card section">
      <div className="card z-depth-0 product-card">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{product.title}</span>
          <p>{product.content}</p>
          <br />
          <p className="grey-text">Urun ID: {product.productid}</p>
          <p className="grey-text">Uretici: {product.farmname} ({product.farmid})</p>
          <p className="grey-text">
            Olusturan: {product.authorFirstName} {product.authorLastName}
          </p>
          <p className="grey-text">
            Tarih: {moment(product.createdAt.toDate()).calendar()}
          </p>
          <br/>
            {showButtons}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
