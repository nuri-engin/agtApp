import {
    CREATE_FARM,
    CREATE_FARM_ERROR
  } from "../actionTypes/farmActionsTypes";

  const initState = {};

const farmReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_FARM:
      return state;
    case CREATE_FARM_ERROR:
      return state;
    default:
      return state;
  }
};

export default farmReducer;