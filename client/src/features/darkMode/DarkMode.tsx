import {createSlice } from '@reduxjs/toolkit';

const initialState={
    dark:false
}

export const darkModeSlice=createSlice({
    name:'dark',
    initialState,
    reducers:{
        updateDarkMode:(state)=>{
            state.dark=!(state.dark)
        },
    }
})

export const {updateDarkMode} = darkModeSlice.actions;

export default darkModeSlice.reducer