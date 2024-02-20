import { createReducer } from "@reduxjs/toolkit";
const initial = {
    product: {}
}
const NewProductCreate = createReducer(initial, {
    NewProductcall: (state) => {
        state.product = {};
        state.loading = true;
        state.sucsses = false;
    },
    NewProductsucsses: (state, action) => {
        state.product = action.payload.Product;
        state.loading = false;
        state.sucsses = true;
    },
    NewProductfail: (state, action) => {
        state.product = {};
        state.loading = false;
        state.sucsses = false;
    },
    NewProductreset: (state) => {
        state = {};
    }

})
export default NewProductCreate