import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar, { Main } from "./Components/Shared/Sidebar";
import Home from "./Modules/Home/Home";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Login from "./Modules/Auth/Login";
import Users from "./Modules/Users/Users";
import Products from "./Modules/Products/Products";
import Deals from "./Modules/Deals/Deals";
import Reports from "./Modules/Reports/Reports";
import Verifications from "./Modules/Verifications/Verifications";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./Components/ProtectedRoutes";

function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Routes that should NOT have the sidebar
  const noSidebarRoutes = ["/login"];
  const isSidebarVisible = !noSidebarRoutes.includes(location.pathname);
  return (
    <>
      <Toaster position="top-right" />
      {isSidebarVisible ? (
        <Box sx={{ display: "flex", width: "100%", overflowX: "auto" }}>
          <Sidebar open={open} setOpen={setOpen} />
          <Main
            open={open}
            sx={{ flexGrow: 1, paddingY: 10, width: "100%", overflowX: "auto" }}
          >
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
              <Route path="/deals" element={<PrivateRoute><Deals /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
              <Route path="/verifications" element={<PrivateRoute><Verifications /></PrivateRoute>} />
            </Routes>
          </Main>
        </Box>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
