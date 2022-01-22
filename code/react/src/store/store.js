import {orderSlice,uiSlice,authSlice} from './slice/slice'
import {configureStore} from '@reduxjs/toolkit'

const reducer = {
    order: orderSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer
}

export default configureStore({reducer})