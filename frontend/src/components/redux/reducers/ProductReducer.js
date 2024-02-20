import { createReducer } from "@reduxjs/toolkit";
const initialstate = {
  products: [],
};

const Product = createReducer(initialstate, {
  Allproduct: (state) => {
    state.Loading = true;
    state.products = [];
  },
  AllproductSucsses: (state, action) => {
    state.Loading = false;
    state.products = action.payload.products;
    state.ProductsCount = action.payload.productscount;
    state.resultperpage=action.payload.resultperpage;
  },
  AllproductFail: (state, action) => {
    state.Loading = false;
    state.error = action.payload;
  },
});
export default Product;
