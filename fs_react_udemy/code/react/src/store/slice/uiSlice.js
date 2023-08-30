import {createSlice} from '@reduxjs/toolkit'

const initialState = {modalDisplay:false,notification:null}

const changeModalDisplayReducer = ({modalDisplay}) =>
{
    return {modalDisplay:!modalDisplay}
}

const notificationReducer = (state,{payload}) => 
{
    const notification = payload
    return {...state,notification}
} 

const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        changeModalDisplay: changeModalDisplayReducer,
        changeNotification: notificationReducer
    }
})

export default uiSlice;
