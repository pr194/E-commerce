import { createReducer } from "@reduxjs/toolkit";
const initialstate = {
    productsAll: [],
};

const Adminallproduct = createReducer(initialstate, {
    adminAllproduct: (state) => {
        state.Loading = true;
        state.productsAll = [];
    },
    adminAllproductSucsses: (state, action) => {
        state.Loading = false;
        state.productsAll = action.payload.products;
        state.ProductsCount = action.payload.productscount;
    },
    adminAllproductFail: (state, action) => {
        state.Loading = false;
        state.productsAll = [];
        state.error = action.payload;
    },
});
export default Adminallproduct;
