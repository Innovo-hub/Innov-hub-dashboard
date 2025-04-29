import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "/users/getAllUsers",
  async ({ page, pageSize,searchUsername } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Build query params only if values exist
      const params = new URLSearchParams();
      if (page) params.append("page", page);
      if (pageSize) params.append("pageSize", pageSize);
      if(searchUsername) params.append("searchUsername", searchUsername);
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/Dashboard/getAllUsers?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);
