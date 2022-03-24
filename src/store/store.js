import {userSlice,counterSlice} from './slice/index'
import {configureStore} from '@reduxjs/toolkit'

const reducer = {
    counter: counterSlice.reducer,
    user: userSlice.reducer
}

export default configureStore({reducer})