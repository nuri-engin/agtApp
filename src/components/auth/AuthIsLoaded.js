import React from "react";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);

  if (!isLoaded(auth))
    return (
      <div className="container center">
        <strong> Uygulama Yukleniyor... Lutfen bekleyiniz! </strong>
      </div>
    );
  return children;
};

export default AuthIsLoaded;
