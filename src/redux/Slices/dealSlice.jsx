import { createSlice } from "@reduxjs/toolkit";
import { getAllDeals } from "../Apis/Deals/getAllDeals";

const dealSlice = createSlice({
    name: "dealslice",
    initialState: {
        allDeals: null,
        dealsLoading: false,
        dealsError: null,
        totalDeals: 0
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDeals.pending, (state) => {
                state.dealsLoading = true;
                state.dealsError = null;
            })
            .addCase(getAllDeals.fulfilled, (state, action) => {
                state.dealsLoading = false;
                state.allDeals = action.payload.Deals;
                // state.totalDeals = action.payload.Metadata.TotalDeals;
            })
            .addCase(getAllDeals.rejected, (state, action) => {
                state.dealsLoading = false;
                state.dealsError = action.payload;
            });
    }
});
export default dealSlice.reducer;