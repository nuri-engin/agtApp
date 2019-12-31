import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
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

  export const updateProduct = product => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      //async ....
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const uid = getState().firebase.auth.uid;
      let docID;

      getState().firestore.ordered.products.forEach(stateProduct => {
        if (stateProduct.productid === product.productid) {
          docID = stateProduct.id
        }
      })

      const updateRef = firestore.collection('products').doc(docID);
      updateRef.set({
        ...product,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: uid,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: UPDATE_PRODUCT, product });
      })
      .catch(err => {
        dispatch({ type: CREATE_PRODUCT_ERROR, err });
      });
    };
  };