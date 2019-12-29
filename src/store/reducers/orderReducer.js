import {
    CREATE_USER_ORDER,
    CREATE_USER_ORDER_ERROR,
    CREATE_FARM_ORDER,
    CREATE_FARM_ORDER_ERROR
  } from "../actionTypes/orderActionTypes";

const initState = {};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_USER_ORDER:
      return state;
    case CREATE_USER_ORDER_ERROR:
      return state;
    case CREATE_FARM_ORDER:
      return state;
    case CREATE_FARM_ORDER_ERROR:
      return state;
    default:
      return state;
  }
};

export default orderReducer;