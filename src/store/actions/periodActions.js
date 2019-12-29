import {
  CREATE_PERIOD,
  CREATE_PERIOD_ERROR
} from "../actionTypes/periodActionTypes";

export const createPeriod = period => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //async ....
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const uid = getState().firebase.auth.uid;

    firestore
      .collection("periods")
      .add({
        ...period,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: uid,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: CREATE_PERIOD, period });
      })
      .catch(err => {
        dispatch({ type: CREATE_PERIOD_ERROR, err });
      });
  };
};
