import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slice/Auth"
import profileReducer from "../slice/profileSlice"

export const store= configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer,
    }
})