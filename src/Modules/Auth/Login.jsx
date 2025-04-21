import {
    Alert,
    CircularProgress,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { loginUser } from "../../redux/Apis/Auth/LoginApi";
  
  function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (!email || !password) return;
      dispatch(loginUser({ email, password }));
    };
  
    useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);
  
    return (
      <div className="min-h-screen bg-[--color-main] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-[--color-main] text-center mb-6">
            Login to Innova Hub Dashboard
          </h2>
  
          {error && <Alert severity="error" className="mb-4">{error}</Alert>}
          {isAuthenticated && <Alert severity="success" className="mb-4">Login successful!</Alert>}
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--color-main]"
              placeholder="you@example.com"
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--color-main]"
              placeholder="Enter your password"
            />
          </div>
  
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-main text-white font-semibold py-2 rounded-md hover:bg-[#0f4e75] transition duration-200 disabled:opacity-60"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </button>
        </div>
      </div>
    );
  }
  
  export default Login;
  