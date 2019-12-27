import { CREATE_PERIOD, CREATE_PERIOD_ERROR } from "../actionTypes/periodActionTypes";

const initState = {
  projects: [
    { id: "1", title: "Period A", content: "foo bar zet content 1" },
    { id: "2", title: "Period B", content: "foo bar zet content 2" },
    { id: "3", title: "Period C", content: "foo bar zet content 3" }
  ]
};

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