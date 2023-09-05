import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'

export default configureStore({
    reducer: {
        logedUser: userReducer
    }
})