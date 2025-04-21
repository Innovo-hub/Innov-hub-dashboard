import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../Apis/Users/getAllusers";

const userSlice = createSlice({
    name : "userslice",
    initialState : {
        allUsers : null,
        usersLoading : false,
        usersError : null,
        totalusers :0
    },
    extraReducers :(builder)=>{
        builder
        .addCase(getAllUsers.pending,(state)=>{
            state.usersLoading = true;
            state.usersError = null;
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.usersLoading = false;
            state.allUsers = action.payload.Users;
            state.totalusers = action.payload.TotalUsers;
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.usersLoading = false;
            state.usersError = action.payload;
        })
    }
});
export default userSlice.reducer;