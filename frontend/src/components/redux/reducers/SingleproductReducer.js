import { createReducer } from "@reduxjs/toolkit";
const initialstate = {
    product: {}
};

const SingleProduct = createReducer(initialstate, {
    Productcall: (state) => {
        state.Loading = true;
        state.product ={};
    },
    ProductSucsses: (state, action) => {
        state.Loading = false;
        state.product = action.payload;
       
    },
    ProductFail: (state, action) => {
        state.Loading = false;
        state.error = action.payload;
    },
});
export default SingleProduct