import { createReducer } from "@reduxjs/toolkit";
const initial = {
    orders: []
}
const Myorders = createReducer(initial, {
    createMyOrderCall: (state) => {
        state.Loading = true;
        state.orders = [];
    },

    createMyNeworder: (state, action) => {
        state.Loading = false;
        state.orders = action.payload;
    },
    createMyOrderFail: (state, action) => {
        state.Loading = false;
        state.orders = [];
        state.error = state.action.payload
    }
})
export default Myorders