//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { createFarm } from "../../store/actions/farmActions";

class CreateFarm extends Component {
  state = {
    title: "",
    content: "",
    farmid: ""
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
    this.props.createFarm(this.state);
    this.props.history.push("/farmlist");
  };

  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Yeni Uretici</h5>
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
            <label htmlFor="farmid">Farm ID</label>
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
    createFarm: farm => dispatch(createFarm(farm))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFarm);
