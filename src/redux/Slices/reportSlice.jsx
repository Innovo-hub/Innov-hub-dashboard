import { createSlice } from "@reduxjs/toolkit";
import { getAllReports } from "../Apis/Reports/getAllReportsApi";

const reportSlice = createSlice({
    name : "report",
    initialState:{
        reportData: [],
        reportsLoading: false,
        reportsError: null,
    },
    extraReducers:(builder) => {
        builder
            .addCase(getAllReports.pending, (state) => {
                state.reportsLoading = true;
                state.reportsError = null;
            })
            .addCase(getAllReports.fulfilled, (state, action) => {
                state.reportsLoading = false;
                state.reportData = action.payload;
            })
            .addCase(getAllReports.rejected, (state, action) => {
                state.reportsLoading = false;
                state.reportsError = action.payload;
            });
    }
});
export default reportSlice.reducer;