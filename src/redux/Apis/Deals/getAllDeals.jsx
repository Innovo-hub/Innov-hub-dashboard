import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDeals = createAsyncThunk(
  '/users/getAllDeals',
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/Dashboard/getAlldeals?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message ||"Failed to fetch Deals");
    }
  }
); 
