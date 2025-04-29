import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllReports = createAsyncThunk(
    "/reports/getAllReports",
    async ({ page, pageSize ,type ,reporterName }, { rejectWithValue }) => {
        try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${import.meta.env.VITE_BASEURL}/api/Dashboard/getAllReports?page=${page}&pageSize=${pageSize}&type=${type}&reporterName=${reporterName}`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            }
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch Reports");
        }
    }
)