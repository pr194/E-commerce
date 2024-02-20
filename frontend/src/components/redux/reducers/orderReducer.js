import { createReducer } from "@reduxjs/toolkit";
const initial={
    order:{}
}

const Order=createReducer(initial,{
    createOrderCall:(state)=>{
       state.Loading=true;
       state.order={};
    },

    createNeworder:(state,action)=>{
       state.Loading=false;
       state.order=action.payload;
    },
    createOrderFail:(state,action)=>{
        state.Loading=false;
        state.order={};
        state.error=state.action.payload
    }
})
export default Order