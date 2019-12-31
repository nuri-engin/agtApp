import { combineReducers } from "redux";

import authReducer from "./authReducer";
import periodReducer from "./periodReducer";
import orderReducer from "./orderReducer";
import productReducer from "./productReducer";
import farmReducer from "./farmReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  period: periodReducer,
  product: productReducer,
  farm: farmReducer,
  order: orderReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
