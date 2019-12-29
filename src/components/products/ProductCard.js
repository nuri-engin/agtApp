//Core
import React from "react";
import moment from "moment";

const ProductCard = ({ product, isOrderCart, handleAddToCard }) => {
  const showButtons = isOrderCart ? (
    <div>
      <button onClick={e => {
        e.preventDefault();
        handleAddToCard(product)
      }}>Add to Card</button>
    </div>
  ) : "";

  return (
    <div className="product-card section">
      <div className="card z-depth-0 product-card">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{product.title}</span>
          <p>Detay: {product.content}</p>
          <br />
          <div className="card-action grey lighten-4 grey-text">
              <div>
                  Olusturan: {product.authorFirstName} {product.authorLastName}
              </div>
              <div> Tarih: {moment(product.createdAt.toDate()).calendar()}</div>
          </div>
          <br/>
            {showButtons}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
