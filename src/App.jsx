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
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/verifications" element={<Verifications />} />
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
