import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slice/Auth"
import profileReducer from "../slice/profileSlice"
import artReducer from "../slice/arworkSlice"
export const store= configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer,
        art:artReducer
    }

})