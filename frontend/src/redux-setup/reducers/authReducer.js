import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    login: {
        currentCustomer: null,
        logged: false,
        error: false
    }
}
const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.login.currentCustomer = action.payload;
            state.login.logged = true;
        },
        loginFail: (state) => {
            state.login.error = true;
        },
        loggedOut: (state) => {
            state.login.currentCustomer = null;
            state.login.logged = false;
            state.login.error = false;
        },
        updateSuccess : (state,action)=>{
            state.login.currentCustomer = action.payload
        },
        
    }
})

export const {loginSuccess, loginFail, loggedOut,updateSuccess} = authReducer.actions;
export default authReducer.reducer;

