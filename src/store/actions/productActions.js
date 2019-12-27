import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_ERROR
  } from "../actionTypes/productActionTypes";
  
  export const createProduct = product => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      //async ....
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const uid = getState().firebase.auth.uid;
  
      firestore
        .collection("products")
        .add({
          ...product,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId: uid,
          createdAt: new Date()
        })
        .then(() => {
          dispatch({ type: CREATE_PRODUCT, product });
        })
        .catch(err => {
          dispatch({ type: CREATE_PRODUCT_ERROR, err });
        });
    };
  };