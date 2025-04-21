import React from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";

function DealTable({ deals }) {
  const theme = useTheme();

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      {deals.length === 0 ? (
        <Alert severity="warning">No deals found.</Alert>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 1000 }} aria-label="deals table">
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
                  "Index",
                  "Owner Name",
                  "Deal Name",
                  "Description",
                  "Offer Deal",
                  "Category",
                  "Offer Money",
                  "Approved"
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
              {deals.map((deal) => (
                <TableRow key={deal.Id}>
                  {/* <TableCell>{deal.Id}</TableCell> */}
                  <TableCell>{deal.Index + 1}</TableCell>
                  <TableCell>{deal.OwnerName}</TableCell>
                  <TableCell>{deal.DealName}</TableCell>
                  <TableCell>{deal.Description}</TableCell>
                  <TableCell>{deal.OfferDeal}</TableCell>
                  <TableCell>{deal.CategoryName}</TableCell>
                  <TableCell>{deal.OfferMoney}</TableCell>
                  <TableCell>{deal.ApprovedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default DealTable;
