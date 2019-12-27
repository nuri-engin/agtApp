//Cpre
import React from "react";
import { NavLink } from "react-router-dom";

//Data
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = props => {
  const initials = props.profile ? props.profile.firstName : "#";
  return (
    <div>
      <ul className="right">
        <li>
            <NavLink to="/farmlist">Ureticiler</NavLink>
        </li>
        <li>
            <NavLink to="/productlist">Urunler</NavLink>
        </li>
        <li>
          <NavLink to="/create-period">Yeni Donem</NavLink>
        </li>
        <li>
          <a href="/" onClick={props.signOut}>
            Cikis
          </a>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            {initials}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
