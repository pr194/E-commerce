import { createReducer } from "@reduxjs/toolkit";
const initialstate = {
    cartItems: window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [],
    shippingInformation: window.localStorage.getItem('shipingInfo') ? JSON.parse(window.localStorage.getItem('shipingInfo')) : {}
}
const Cart = createReducer(initialstate, {
    AddTocart: (state, action) => {
        const item = action.payload
        const isItemExist = state.cartItems.find((i) => i.product === item.product)
        if (isItemExist) {
            state.cartItems = state.cartItems.map((i) =>
                i.product === isItemExist.product ? item : i);
        }
        else {

            state.cartItems = [...state.cartItems, item];

        }
    },
    RemovecartItem: (state, action) => {
        const remove = action.payload
        state.cartItems = state.cartItems.filter((item) => { return item.product !== remove })
    },
    ShippingInfo: (state, action) => {
        state.shippingInformation=action.payload
    }

})
export default Cart