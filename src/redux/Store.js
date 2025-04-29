import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import productReducer from "./Slices/productSlice";
import dealsReducer from './Slices/dealSlice';
import reportReducer from './Slices/reportSlice';
import verificationReducer from './Slices/verificationSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
        deal: dealsReducer,
        report: reportReducer,
        verification: verificationReducer,
    },
});
