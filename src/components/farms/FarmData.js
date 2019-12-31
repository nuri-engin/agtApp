//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { createFarm, updateFarm } from "../../store/actions/farmActions";

class FarmData extends Component {
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

  handleSubmit = (farm) => {
    farm ? 
      this.props.updateFarm(this.state) : 
      this.props.createFarm(this.state);
    
    this.props.history.goBack();
  };

  // Update Farm process
  componentDidMount = () => {
    const { farm } = this.props.location;

    if (farm) {
      this.setState(state => {
        const updatedState = Object.keys(state)
          .reduce(function(accumulator, key) {
            accumulator[key] = farm[key]
            return accumulator
          }, {});

        return updatedState;
      });
    }
  }

  render() {
    const { auth } = this.props;
    const { farm } = this.props.location;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={(e) => {
          e.persist();
          e.preventDefault();
          this.handleSubmit(farm)
        }}>
          <h5 className="grey-text text-darken-3"> {farm ? `${farm.title}` : "Yeni Uretici"}</h5>
          <div className="input-field">
            <label htmlFor="title" className={farm ? "active" : ""}>Baslik</label>
            <input type="text" id="title" defaultValue={farm ? farm.title : ""} onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="content" className={farm ? "active" : ""}>Detay</label>
            <textarea
              className="materialize-textarea"
              id="content"
              defaultValue={farm ? farm.content : ""}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="farmid" className={farm ? "active" : ""}>Farm ID</label>
            <input type="number" id="farmid" required defaultValue={farm ? farm.farmid : ""} onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0"> {farm ? "Guncelle" : "Olustur"} </button>
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
    updateFarm: farm => dispatch(updateFarm(farm)),
    createFarm: farm => dispatch(createFarm(farm))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FarmData);
