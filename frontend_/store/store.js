import { configureStore } from '@reduxjs/toolkit'
import  userreducer  from './Userslice'
export const store = configureStore({
  reducer: {
    user: userreducer
  },
})  