//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { createProduct, updateProduct } from "../../store/actions/productActions";

class ProductData extends Component {
  state = {
    productid: "",
    title: "",
    content: "",
    farmid: "",
    farmname: ""
  };

  handleChange = e => {
    e.persist();

    //Ensure given number is converted to Number instead of String.
    const targetValue = e.target.id.includes("id") ? Number(e.target.value) : e.target.value;

    this.setState({
      [e.target.id]: targetValue
    });
  };

  handleSubmit = product => {
    product ? 
      this.props.updateProduct(this.state) : 
      this.props.createProduct(this.state);
    
    this.props.history.goBack();
  };

  // Update Product process
  componentDidMount = () => {
    const { product } = this.props.location;

    if (product) {
      this.setState(state => {
        const updatedState = Object.keys(state)
          .reduce(function(accumulator, key) {
            accumulator[key] = product[key]
            return accumulator
          }, {});

        return updatedState;
      });
    }
  }

  render() {
    const { auth } = this.props;
    const { product } = this.props.location;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={(e) => {
            e.persist(); e.preventDefault();
            this.handleSubmit(product)
          }}>
          <h5 className="grey-text text-darken-3">Urun Karti: {product ? "Guncelle" : "Yeni"}</h5>

          <div className="input-field">
            <label htmlFor="title" className={product ? "active" : ""}>Baslik</label>
            <input type="text" id="title" onChange={this.handleChange} defaultValue={product ? product.title : ""}/>
          </div>
          
          <div className="input-field">
            <label htmlFor="content" className={product ? "active" : ""}>Detay</label>
            <textarea
              className="materialize-textarea"
              id="content"
              defaultValue={product ? product.content : undefined}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="productid" className={product ? "active" : ""}>Urun ID </label>
            <input type="number" id="productid" required defaultValue={product ? product.productid : ""} onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="farmname" className={product ? "active" : ""}>Uretici </label>
            <input type="text" id="farmname" required defaultValue={product ? product.farmname : ""} onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="farmid" className={product ? "active" : ""}>Uretici ID </label>
            <input type="number" id="farmid" required defaultValue={product ? product.farmid : ""} onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">{product ? "Guncelle" : "Olustur"}</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: product => dispatch(updateProduct(product)),
    createProduct: product => dispatch(createProduct(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductData);
