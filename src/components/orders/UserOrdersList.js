//Core
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { compose } from "redux";

class UserOrdersList extends Component {
  render() {
    const { auth } = this.props;
    const { userOrders, period } = this.props.location;
    
    if (!auth.uid) return <Redirect to="/signin" />;
    if (userOrders && userOrders.length) {
      let allUsers = []
      userOrders.forEach(user => allUsers.push(user.id));
    
      return (
        <div className="give-order container">
          <div>
            <p>Search/ Filter</p>
          </div>
          <div className="row">
            <div className="col s5 create-order-card">
              <h5> {period.title} dagitim donemi: Siparis Veren Kullanicilar...</h5>
              {allUsers &&
                allUsers.map((user, index) => {
                  return (
                    <p key={index}>{user}</p>
                  );
                })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h4>{period ? period.title + ' dagitim donemi: ' : ''} Henuz siparis veren kullanici yoktur!</h4>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(UserOrdersList);
