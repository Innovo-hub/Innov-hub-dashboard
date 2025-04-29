import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function UserVerificationTable({ data }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { PendingVerifications = [] } = data;

 

  return (
    <Paper sx={{ width: "100%", overflowX: "auto", p: 2 }}>
      {PendingVerifications.length === 0 ? (
        <Alert severity="info">No pending verifications found.</Alert>
      ) : (
        <TableContainer>
          <Table aria-label="pending verification table">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                {[
                  "Index",
                  "Name",
                  "Email",
                  "Role",
                  "Upload Date",
                  "Verification Date",
                  "Front ID",
                  "Back ID",
                ].map((header) => (
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
                <TableRow
                  key={user.UserId}
                  sx={{ cursor: "pointer" }}
                  hover
                >
                  <TableCell>{user.Index}</TableCell>
                  <TableCell>{user.UserName}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.Role}</TableCell>
                  <TableCell>{user.UploadDate}</TableCell>
                  <TableCell>{user.VerificationDate}</TableCell>
                  <TableCell>
                    <Link href={user.FrontIdUrl} target="_blank" rel="noopener">
                      View
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={user.BackIdUrl} target="_blank" rel="noopener">
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default UserVerificationTable;
