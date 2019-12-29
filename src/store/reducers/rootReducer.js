import { combineReducers } from "redux";

import authReducer from "./authReducer";
import periodReducer from "./periodReducer";
import orderReducer from "./orderReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  period: periodReducer,
  order: orderReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
