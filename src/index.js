//Core
import React from "react";
import ReactDOM from "react-dom";

//UI
import App from "./App";
import AuthIsLoaded from "./components/auth/AuthIsLoaded";
import "./index.css";

//Data
import { Provider } from "react-redux";
import firebase from "firebase/app";
import fbConfig from "./config/fbConfig";
import { createFirestoreInstance } from "redux-firestore";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
