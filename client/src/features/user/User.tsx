import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState={
    user:""
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUser:(state,action:PayloadAction<string>)=>{
            state.user=action.payload
        },
    }
})

export const {updateUser}=userSlice.actions

export default userSlice.reducer