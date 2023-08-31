import {createSlice} from '@reduxjs/toolkit'

const initialState = {user:null,auth:false}

const authReducer = (state,{payload}) => 
{
    return payload.auth 
        ? {auth:true,user:payload.user}
        : initialState
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        auth: authReducer
    }
})

export default userSlice;
