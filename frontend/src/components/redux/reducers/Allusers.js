
import { createReducer } from "@reduxjs/toolkit";

const initial2={
    sucsses:false
}
export const AdminDeleteuser=createReducer(initial2,{
    AdminDeletecall:(state)=>{
        state.sucsses=false;
    },
    AdminDeletesucsses:(state)=>{
        state.sucsses=true;
    },
    AdminDeletefail:(state)=>{
         state.sucsses=false;
    }
})
