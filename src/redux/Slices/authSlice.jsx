import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../Apis/Auth/LoginApi";


const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      state.isAuthenticated = false;
      state.token = null;
    },
    setAuthFromStorage: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        const token = action.payload.Token;
        state.token = token;
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", String(Date.now() + TWO_DAYS));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;