import React, { useState } from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Alert, Link, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASEURL;

function UserVerificationTable({ data, refreshData }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { PendingVerifications = [] } = data;
  const token = localStorage.getItem("token");

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleVerify = async (userId, isApproved, reason = "") => {
    const toastId = toast.loading(`${isApproved ? "Approving" : "Rejecting"} ID...`);
    try {
      await axios.post(
        `${baseURL}/api/Dashboard/verify-id-card`,
        {
          UserId: userId,
          IsApproved: isApproved,
          RejectionReason: reason
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`ID ${isApproved ? "approved" : "rejected"} successfully.`, { id: toastId });
      if (refreshData) window.location.reload();
    } catch (error) {
      toast.error("Verification failed.", { id: toastId });
    } finally {
      handleRejectDialogClose();
    }
  };

  const handleRejectClick = (user) => {
    setSelectedUser(user);
    setRejectDialogOpen(true);
  };

  const handleRejectDialogClose = () => {
    setRejectDialogOpen(false);
    setRejectionReason("");
    setSelectedUser(null);
  };

  const handleRejectSubmit = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }
    handleVerify(selectedUser.UserId, false, rejectionReason);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflowX: "auto", p: 2 }}>
        {PendingVerifications.length === 0 ? (
          <Alert severity="info">No pending verifications found.</Alert>
        ) : (
          <TableContainer>
            <Table aria-label="pending verification table">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  {["Index", "Name", "Email", "Role", "Upload Date", "Verification Date", "Front ID", "Back ID", "Actions"].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ color: theme.palette.common.white, fontWeight: 600 }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {PendingVerifications.map((user) => (
                  <TableRow key={user.UserId} hover>
                    <TableCell>{user.Index}</TableCell>
                    <TableCell>{user.UserName}</TableCell>
                    <TableCell>{user.Email}</TableCell>
                    <TableCell>{user.Role}</TableCell>
                    <TableCell>{user.UploadDate}</TableCell>
                    <TableCell>{user.VerificationDate}</TableCell>
                    <TableCell>
                      <Link href={user.FrontIdUrl} target="_blank" rel="noopener">View</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={user.BackIdUrl} target="_blank" rel="noopener">View</Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          color="success"
                          variant="contained"
                          size="small"
                          onClick={() => handleVerify(user.UserId, true)}
                        >
                          Approve
                        </Button>
                        <Button
                          color="error"
                          variant="outlined"
                          size="small"
                          onClick={() => handleRejectClick(user)}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Reject Confirmation Dialog */}
      <Dialog open={rejectDialogOpen} onClose={handleRejectDialogClose}>
        <DialogTitle>Reject Verification</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Please provide a reason for rejecting{" "}
            <strong>{selectedUser?.UserName}</strong>'s ID.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Reason"
            fullWidth
            multiline
            minRows={3}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleRejectSubmit} variant="contained" color="error">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserVerificationTable;
