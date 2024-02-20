import { createReducer } from "@reduxjs/toolkit";
const message = {}
const ProfileUpdate = createReducer(message, {
    Updatecall: (state) => {
        state.Loading = true;
        state.Isupdated = false;
    },
    UpadateSucsses: (state, action) => {
        state.Loading = false;
        state.Isupdated = true;
        state.message = action.payload.message;

    },
    UpdateFailure: (state, action) => {
        state.Loading = false;
        state.message = action.payload;
        state.Isupdated = false;
    },
    RsetUser: (state) => {
        state.message = {};
        state.Isupdated = true;
        state.Loading = false;
    }

})
export default ProfileUpdate