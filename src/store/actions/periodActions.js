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

// // Order State!
// var orderObj = {}
// var orderData = {
//     orders: [
//         {
//             prod_order_id: "order_192",
//             prod_name: "Kara Pekmez 2",
//             prod_id: 192,
//             prod_qty: 1, 
//             prod_total_price: 25.2,
//             prod_farm_id: 523,
//             prod_farm_name: "PEKMEZCI"
//         },
//         {
//             prod_order_id: "order_472",
//             prod_name: "Beyaz Pekmez 2",
//             prod_id: 472,
//             prod_qty: 2, 
//             prod_total_price: 23.2,
//             prod_farm_id: 523,
//             prod_farm_name: "PEKMEZCI"
//         },
//         {
//             prod_order_id: "613",
//             prod_name: "Kasar 2",
//             prod_id: 613,
//             prod_qty: 1, 
//             prod_total_price: 148.2,
//             prod_farm_id: 600,
//             prod_farm_name: "PEYNIRCI"
//         },
//         {
//             prod_order_id: "614",
//             prod_name: "Beyaz Peynir 4",
//             prod_id: 614,
//             prod_qty: 2, 
//             prod_total_price: 98.2,
//             prod_farm_id: 600,
//             prod_farm_name: "PEYNIRCI"
//         }
// ]};

// // #1. User ORDERs request:
// firestore
//     .collection("user_orders")
//     .doc("february")
//     .collection("users")
//     .doc("BarZet")
//     .set(orderData, {merge: true})
//     .then(() => console.log("User orders proceed!"))
//     .catch(err => console.log("ERROR"));

// // #2. Farm ORDERs request:
// orderData.orders.forEach(order => {

//     // Create SUBCOLLECTION
//     firestore
//         .collection("farm_orders")
//         .doc("february")
//         .collection("farms")
//         .doc(order.prod_farm_name)
//         .set({orders: getFarmOrders(order.prod_farm_name)}, {merge: true}) 
//         .then(() => console.log("Farm orders proceed!"))
//         .catch(err => console.log("ERROR"));
// });

// function getFarmOrders (farm_name) {
//     orderData.orders.forEach(order => {

//         if (!isEmpty(orderObj) && !isEmpty(orderObj[order.prod_farm_name])) {
//             orderObj[order.prod_farm_name].push(order)
//             console.log("pushed", order.prod_name)
//         } else {
//             orderObj[order.prod_farm_name] = [order]
//             console.log("created")
//         }
//     });

//     combineFarmData(farm_name)

//     return orderObj[farm_name]
// }

// function combineFarmData (farm_name) {
//     getState().firestore.ordered.farm_orders.forEach(order => {
//         if (order.id === farm_name) {
//             order.orders.forEach(item => {
//                 orderObj[item.prod_farm_name].push(item)
//             })
//         }
//     })

// }

// function isEmpty(value){
//     return (value == undefined || value == null || value.length === 0 || Object.entries(value).length === 0);
// }
