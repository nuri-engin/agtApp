import {
    CREATE_USER_ORDER,
    CREATE_USER_ORDER_ERROR,
    CREATE_FARM_ORDER,
    CREATE_FARM_ORDER_ERROR
  } from "../actionTypes/orderActionTypes";
  
  export const createOrder = (orders, period) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //async ....
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const uid = getState().firebase.auth.uid;
        
        let orderObj = {}
        let orderData = {
            order_user: profile.firstName + profile.lastName,
            order_userId: uid,
            createdAt: new Date(),
            orders: orders
        };
        
        // #1. User ORDERs request:
        firestore
            .collection("user_orders")
            .doc(period.title)
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
                .doc(period.title)
                .collection("farms")
                .doc(order.farmname)
                .set({orders: getFarmOrders(order.farmname)}, {merge: true}) 
                .then(() => {
                    dispatch({ type: CREATE_FARM_ORDER, orderData });
                    console.log("Farm orders proceed!")
                })
                .catch(err => {
                    dispatch({ type: CREATE_FARM_ORDER_ERROR, err });
                    console.log("ERROR")
                });
        });

        function getFarmOrders (farmname) {
            orderData.orders.forEach(order => {

                if (!isEmpty(orderObj) && !isEmpty(orderObj[order.farmname])) {
                    orderObj[order.farmname].push(order);
                } else {
                    orderObj[order.farmname] = [order];
                }
            });

            combineFarmData(farmname)

            return orderObj[farmname]
        }

        function combineFarmData (farmname) {
            if (getState().firestore.ordered.farm_orders) {
                getState().firestore.ordered.farm_orders.forEach(order => {
                    if (order.id === farmname) {
                        order.orders.forEach(item => {
                            orderObj[item.farmname].push(item)
                        });
                    }
                })
            }
        }

        function isEmpty(value){
            return (value === undefined || value === null || value.length === 0 || Object.entries(value).length === 0);
        }
  }};