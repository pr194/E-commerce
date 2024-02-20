import { createReducer } from "@reduxjs/toolkit"

const initial = {
    order: {}
}
const SingleOrderDetails = createReducer(initial, {
    singleOrderCall: (state) => {
        state.Loading = true;
        state.order = {};
    },
    singleOrderSucsses: (state, action) => {
        state.Loading = false;
        state.order = action.payload;
    },
    singleOrderFail: (state) => {
        state.Loading = false;
        state.order = {};
    }
})
export default SingleOrderDetails