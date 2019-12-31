import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    CREATE_PRODUCT_ERROR
  } from "../actionTypes/productActionTypes";

const initState = {};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return state;
    case UPDATE_PRODUCT:
      return state;
    case CREATE_PRODUCT_ERROR:
        return state;
    default:
      return state;
  }
};

export default productReducer;