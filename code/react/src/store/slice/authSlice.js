import {createSlice} from '@reduxjs/toolkit'

const initialState = {auth:false,user:null,jwtToken:null}

const authReducer = (state,{payload}) =>
{
    const {auth} = payload
    return auth
}

const authSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        setAuth: authReducer,
    }
})

export default authSlice;
