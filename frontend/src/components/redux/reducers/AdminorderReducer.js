import { createReducer } from '@reduxjs/toolkit'
const initial={
    orders:[]

}
export const getallorder = createReducer(initial, {
    Getallordercall: (state) => {
             state.orders = [];
            state.Loading = true;
    },
    GetallorderSucsses: (state, action) => {
        state.orders = action.payload.orders
        state.Loading = false;
        state.totalamount=action.payload.totalAmount
    },
    GetallorderFail: (state, action) => {
        state.Loading = false;
        state.orders = [];
    }
})
export const AdminoUpdate=createReducer({},{
    Aocall:(state)=>{
        state.Loading=true;
        state.sucsses=false;
    },
    Aosucsses:(state,action)=>{
        state.Loading=false;
        state.sucsses=action.payload.sucsses;
    },
    Aofail:(state)=>{
        state.Loading=false;
        state.sucsses=false;
    }
})
