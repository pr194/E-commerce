import { createReducer } from "@reduxjs/toolkit";
const initial = {
    users: []
}

export const Aalluser = createReducer(initial, {
    Ausercall: (state) => {
        state.users = [];
        state.Loading = true;
    },
    Ausersucsses: (state, action) => {
        state.users = action.payload.user;
        state.Loading = false;
    },
    Auserfail: (state) => {
        state.Loading = false;
        state.users = [];
    }
})