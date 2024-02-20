import { createReducer } from "@reduxjs/toolkit"
const intial = {
    review: {}
}
const Review = createReducer(intial, {
    Reviewcall: (state) => {
        state.sucsses = false;
        state.review = {}
    },
    ReviewSucsses: (state, action) => {
        state.sucsses = true;
        state.review = action.payload;
    },
    ReviewFail: (state, action) => {
        state.sucsses = false;
        state.review = {}
    },
    Reviewreset: (state) => {
        state.sucsses = false;
        state.review = {}
    }

})
export default Review;