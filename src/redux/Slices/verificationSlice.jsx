import { createSlice } from "@reduxjs/toolkit";
import { getAllVerifications } from "../Apis/Verifications/getAllVerificationsApi";

const verificationSlice = createSlice({
    name : 'verification',
    initialState:{
        verificationData: [],
        verificationLoading: false,
        verificationError: null,
    },
    extraReducers:(builder) => {
        builder
        .addCase(getAllVerifications.pending, (state) => {
            state.verificationLoading = true;
            state.verificationError = null;
        }
        )
        .addCase(getAllVerifications.fulfilled, (state, action) => {
            state.verificationLoading = false;
            state.verificationData = action.payload;
        }
        )
        .addCase(getAllVerifications.rejected, (state, action) => {
            state.verificationLoading = false;
            state.verificationError = action.payload;
        }
        )
    }
});
export default verificationSlice.reducer;