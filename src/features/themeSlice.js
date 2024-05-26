import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: localStorage.getItem('darkMode') || false,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        toggleDarkMode: (state, action) =>{
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', state.darkMode)
        },
        setDarkMode: (state, action) =>{
            state.darkMode = action.payload;
            localStorage.setItem('darkMode', state.darkMode)
        }
    }
})

export const {toggleDarkMode, setDarkMode} = themeSlice.actions;
export default themeSlice.reducer;