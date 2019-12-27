import {
    CREATE_FARM,
    CREATE_FARM_ERROR
  } from "../actionTypes/farmActionsTypes";
  
  export const createFarm = farm => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      //async ....
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const uid = getState().firebase.auth.uid;
  
      firestore
        .collection("farms")
        .add({
          ...farm,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId: uid,
          createdAt: new Date()
        })
        .then(() => {
          dispatch({ type: CREATE_FARM, farm });
        })
        .catch(err => {
          dispatch({ type: CREATE_FARM_ERROR, err });
        });
    };
  };