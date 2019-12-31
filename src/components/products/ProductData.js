//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { createProduct } from "../../store/actions/productActions";

class ProductData extends Component {
  state = {
    productid: 0,
    title: "",
    content: "",
    farmid: 0,
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

  handleSubmit = e => {
    e.persist();
    e.preventDefault();
    this.props.createProduct(this.state);
    this.props.history.goBack();
  };

  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Yeni Urun</h5>

          <div className="input-field">
            <label htmlFor="title">Baslik</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          
          <div className="input-field">
            <label htmlFor="content">Detay</label>
            <textarea
              className="materialize-textarea"
              id="content"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="productid">Urun ID </label>
            <input type="number" id="productid" required onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="farmname">Uretici </label>
            <input type="text" id="farmname" required onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="farmid">Uretici ID </label>
            <input type="number" id="farmid" required onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Olustur</button>
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
    createProduct: product => dispatch(createProduct(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductData);
