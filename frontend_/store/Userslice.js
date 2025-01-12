import {createSlice} from '@reduxjs/toolkit'

const initialvalue = {
    _id:"",
    name:"",
    email:""
}

const userSlice = createSlice({
    name:"user",
    initialState : initialvalue,
    reducers:{
        setuserdetails:(state,action)=>{
            state = {...action.payload}
        }
    }
})

const {setuserdetails} = userSlice.actions
export default userSlice.reducer