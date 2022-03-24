import {createSlice} from '@reduxjs/toolkit'

const initialState = {ctr:0,toggle:true}

const ctrReducer = (state,{payload}) => ({...state,ctr:state.ctr+payload});

const toggleReducer = (state) => ({...state,toggle:!state.toggle})

const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        ctr: ctrReducer,
        toggle: toggleReducer
    }
})

export default counterSlice;