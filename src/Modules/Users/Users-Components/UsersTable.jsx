import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Alert, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdBlock, MdRestore } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASEURL;

function UserTable({ users, page, setPage, limit, setLimit, totalUsers }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(""); // "block" or "unblock"

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleConfirm = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setConfirmOpen(true);
  };

  const handleDialogClose = () => {
    setConfirmOpen(false);
    setSelectedUser(null);
    setActionType("");
  };

  const handleBlockUnblock = async () => {
    const userId = selectedUser?.Id;
    const url = `${baseURL}/api/Dashboard/${actionType}/${userId}`;
    const toastId = toast.loading(`${actionType === "block" ? "Blocking" : "Unblocking"} user...`);
    try {
      await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`User ${actionType === "block" ? "blocked" : "unblocked"} successfully!`, { id: toastId });
      handleDialogClose();
      window.location.reload();
    } catch (error) {
      toast.error(`Failed to ${actionType} user.`, { id: toastId });
    }
  };

  return (
    <>
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
                    {["Id", "Name", "Email", "Role", "City", "District", "Registered At", "Actions"].map((head) => (
                      <TableCell key={head} sx={{ color: theme.palette.text.secondary, fontWeight: 700 }}>
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, id) => (
                    <TableRow key={user.Id} sx={{ cursor: "pointer" }}>
                      <TableCell>{id + 1}</TableCell>
                      <TableCell>{user.Name}</TableCell>
                      <TableCell>{user.Email}</TableCell>
                      <TableCell>{user.Role}</TableCell>
                      <TableCell>{user.City}</TableCell>
                      <TableCell>{user.District}</TableCell>
                      <TableCell>{user.RegisteredAt}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleConfirm(user, "block")} className={user.IsBlocked? "hidden" : "flex"}>
                            <MdBlock size={20} color="red" />
                          </button>
                          <button onClick={() => handleConfirm(user, "unblock")} className={user.IsBlocked? "flex" : "hidden"}>
                            <MdRestore size={20} color="green" />
                          </button>
                        </div>
                      </TableCell>
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

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleDialogClose}>
        <DialogTitle>{actionType === "block" ? "Block User" : "Unblock User"}</DialogTitle>
        <DialogContent>
          <div className="flex justify-center mb-4">
            Are you sure you want to {actionType}{" "}
            <strong className="mx-1">{selectedUser?.Name}</strong>?
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">Cancel</Button>
          <Button
            onClick={handleBlockUnblock}
            color={actionType === "block" ? "error" : "success"}
            variant="contained"
          >
            {actionType === "block" ? "Block" : "Unblock"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserTable;
