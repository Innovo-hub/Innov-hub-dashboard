import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar, { Main } from "./Components/Shared/Sidebar";
import Home from "./Modules/Home/Home";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Login from "./Modules/Auth/Login";
import Users from "./Modules/Users/Users";

function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Routes that should NOT have the sidebar
  const noSidebarRoutes = ["/login"];
  const isSidebarVisible = !noSidebarRoutes.includes(location.pathname);
  return (
    <>
        {isSidebarVisible ? ( <Box sx={{ display: "flex", width: "100%", overflowX: "auto" }}>
        <Sidebar open={open} setOpen={setOpen} />
        <Main open={open} sx={{ flexGrow: 1,paddingY:10 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/users' element={<Users/>}/>
          </Routes>
        </Main>
      </Box>):(
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
