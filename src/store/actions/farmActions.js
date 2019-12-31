import {
    CREATE_FARM,
    UPDATE_FARM,
    DELETE_FARM,
    CREATE_FARM_ERROR,
    UPDATE_FARM_ERROR,
    DELETE_FARM_ERROR
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

  export const updateFarm = farm => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      //async ....
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const uid = getState().firebase.auth.uid;
      let docID;
      
      getState().firestore.ordered.farms.forEach(stateFarm => {
        if (stateFarm.farmid === farm.farmid) {
          docID = stateFarm.id
        }
      })

      const updateRef = firestore.collection('farms').doc(docID);
      updateRef.set({
        ...farm,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: uid,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: UPDATE_FARM, farm });
      })
      .catch(err => {
        dispatch({ type: UPDATE_FARM_ERROR, err });
      });
    };
  };

  export const deleteFarm = farm => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      //async ....
      const firestore = getFirestore();
      let docID;

      getState().firestore.ordered.farms.forEach(stateFarm => {
        if (stateFarm.farmid === farm.farmid) {
          docID = stateFarm.id
        }
      });

      firestore.collection('farms').doc(docID).delete()
        .then(() => {
          dispatch({ type: DELETE_FARM, farm });
        })
        .catch(err => {
          dispatch({ type: DELETE_FARM_ERROR, err });
        });        
    };
  };