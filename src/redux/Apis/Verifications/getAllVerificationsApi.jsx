import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllVerifications = createAsyncThunk(
    "/verifications/getAllVerifications",
    async (_, { rejectWithValue }) => {
        try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${import.meta.env.VITE_BASEURL}/api/Dashboard/verifications`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            }
        );
    
        return response.data;
        } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch verifications");
        }
    }
)