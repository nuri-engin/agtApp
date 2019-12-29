import {
    CREATE_USER_ORDER,
    CREATE_USER_ORDER_ERROR,
    CREATE_FARM_ORDER,
    CREATE_FARM_ORDER_ERROR
  } from "../actionTypes/orderActionTypes";
  
  export const createOrder = orders => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //async ....
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        
        let orderObj = {}
        let orderData = {
            orders: orders};

        // #1. User ORDERs request:
        firestore
            .collection("user_orders")
            .doc("Subat")
            .collection("users")
            .doc(profile.firstName + profile.lastName)
            .set(orderData, {merge: true})
            .then(() => {
                dispatch({ type: CREATE_USER_ORDER, orderData });
                console.log("User orders proceed!")
            })
            .catch(err => {
                dispatch({ type: CREATE_USER_ORDER_ERROR, err });
                console.log("ERROR")
        });

        // #2. Farm ORDERs request:
        orderData.orders.forEach(order => {

            // Create SUBCOLLECTION
            firestore
                .collection("farm_orders")
                .doc("Subat")
                .collection("farms")
                .doc(order.prod_farm_name)
                .set({orders: getFarmOrders(order.prod_farm_name)}, {merge: true}) 
                .then(() => {
                    dispatch({ type: CREATE_FARM_ORDER, orderData });
                    console.log("Farm orders proceed!")
                })
                .catch(err => {
                    dispatch({ type: CREATE_FARM_ORDER_ERROR, err });
                    console.log("ERROR")
                });
        });

        function getFarmOrders (farm_name) {
            orderData.orders.forEach(order => {

                if (!isEmpty(orderObj) && !isEmpty(orderObj[order.prod_farm_name])) {
                    orderObj[order.prod_farm_name].push(order)
                    console.log("pushed", order.prod_name)
                } else {
                    orderObj[order.prod_farm_name] = [order]
                    console.log("created")
                }
            });

            combineFarmData(farm_name)

            return orderObj[farm_name]
        }

        function combineFarmData (farm_name) {
            if (getState().firestore.ordered.farm_orders) {
                getState().firestore.ordered.farm_orders.forEach(order => {
                    if (order.id === farm_name) {
                        order.orders.forEach(item => {
                            orderObj[item.prod_farm_name].push(item)
                        })
                    }
                })
            }
        }

        function isEmpty(value){
            return (value === undefined || value === null || value.length === 0 || Object.entries(value).length === 0);
        }
  }};