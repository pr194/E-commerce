import { createReducer } from "@reduxjs/toolkit";
const user = {}
const User = createReducer(user, {
    Usercall: (state) => {
        state.Loading = true;
        state.IsAuthenticated = false;
        state.user = {};
    },
    UserSucsses: (state, action) => {
        state.Loading = false;
        state.IsAuthenticated = true;
        state.user = action.payload.user;

    },
    UserFailure: (state, action) => {
        state.Loading = false;
        state.error = action.payload;
        state.IsAuthenticated = false;
    },
    LogoutUser: (state) => {
        state.Loading = false;
        state.IsAuthenticated = false;
        state.user = {};
    }

})
export default User