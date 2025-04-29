import React from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";

function ReportTable({ reports, totalReports, page, setPage, limit, setLimit }) {
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      {reports.length === 0 ? (
        <Alert severity="warning">No reports found.</Alert>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 1000 }} aria-label="reports table">
              <TableHead>
                <TableRow
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: theme.palette.primary.main,
                    zIndex: 1,
                  }}
                >
                  {[
                    "ID",
                    "Reporter Name",
                    "Reporter ID",
                    "Reported Type",
                    "Message",
                    "Created At",
                    "Reported User",
                    "Reported Deal",
                    "Reported Product"
                  ].map((label) => (
                    <TableCell
                      key={label}
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 700,
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report, id) => (
                  <TableRow key={report.ReportId}>
                    <TableCell>{id + 1}</TableCell>
                    <TableCell>{report.ReporterName}</TableCell>
                    <TableCell>{report.ReporterId}</TableCell>
                    <TableCell>{report.ReportedType}</TableCell>
                    <TableCell>{report.Message}</TableCell>
                    <TableCell>{new Date(report.CreatedAt).toLocaleString()}</TableCell>
                    <TableCell>{report.ReportedUser ? JSON.stringify(report.ReportedUser) : "N/A"}</TableCell>
                    <TableCell>{report.ReportedDeal ? JSON.stringify(report.ReportedDeal) : "N/A"}</TableCell>
                    <TableCell>{report.ReportedProduct ? JSON.stringify(report.ReportedProduct) : "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalReports || 0}
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

export default ReportTable;
