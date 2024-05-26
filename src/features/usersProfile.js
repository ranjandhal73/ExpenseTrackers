import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: null,
}

const userDetails = createSlice({
    name: 'userDetails',
    initialState,
    reducers:{
        setUser: (state, action) =>{
            // const id = action.payload.userId;
            // const data = action.payload.usersProfileData;
            // const usersData = {id, ...data}
            // console.log(usersData);
            state.users = action.payload;
            // localStorage.setItem('userId', id);
        },
        clearUser: (state) =>{
            state.users = null;
        }
    }
})

export const {setUser, clearUser} = userDetails.actions;

export default userDetails.reducer;