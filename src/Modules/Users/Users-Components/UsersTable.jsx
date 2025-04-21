import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function UserTable({ users, page, setPage, limit, setLimit, totalUsers }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleUserNavigate = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      {users.length === 0 ? (
        <Alert severity="warning">No users found.</Alert>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: theme.palette.primary.main,
                    zIndex: 1,
                  }}
                >
                  <TableCell
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 700,
                    }}
                  >
                    Id
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 700,
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 700,
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 700,
                    }}
                  >
                    Role
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 700,
                    }}
                  >
                    City
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 700,
                    }}
                  >
                    District
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 700,
                    }}
                  >
                    Registered At
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user,id) => (
                  <TableRow
                    key={user.Id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleUserNavigate(user.Id)}
                  >
                    <TableCell>{id+1}</TableCell>
                    <TableCell>{user.Name}</TableCell>
                    <TableCell>{user.Email}</TableCell>
                    <TableCell>{user.Role}</TableCell>
                    <TableCell>{user.City}</TableCell>
                    <TableCell>{user.District}</TableCell>
                    <TableCell>{user.RegisteredAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalUsers}
            rowsPerPage={limit}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}

export default UserTable;
