import { CREATE_PERIOD, CREATE_PERIOD_ERROR } from "../actionTypes/periodActionTypes";

const initState = {};

const periodReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_PERIOD:
      return state;
    case CREATE_PERIOD_ERROR:
      return state;
    default:
      return state;
  }
};

export default periodReducer;