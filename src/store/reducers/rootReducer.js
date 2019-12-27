import { combineReducers } from "redux";

import authReducer from "./authReducer";
import periodReducer from "./periodReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  period: periodReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
