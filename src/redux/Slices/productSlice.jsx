import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../Apis/Products/getAllProductsApi";

const productSlice = createSlice({
    name : 'productSlice',
    initialState : {
        allProducts : null,
        productsLoading : false,
        productsError : null,
        totalProducts : 0
    },
    extraReducers : (builder) => {
        builder
        .addCase(getAllProducts.pending, (state) => {
            state.productsLoading = true;
            state.productsError = null;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.productsLoading = false;
            state.allProducts = action.payload.Products;
            state.totalProducts = action.payload.Metadata.TotalProducts; 
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.productsLoading = false;
            state.productsError = action.payload;
        });
    }
});
export default productSlice.reducer;