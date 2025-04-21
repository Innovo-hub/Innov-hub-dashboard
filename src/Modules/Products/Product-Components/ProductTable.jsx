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
import { useNavigate } from "react-router-dom";

function ProductTable({ products, totalProducts, page, setPage, limit, setLimit }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleProductNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      {products.length === 0 ? (
        <Alert severity="warning">No products found.</Alert>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 1000 }} aria-label="products table">
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
                    "Name",
                    "Author",
                    "Description",
                    "Category",
                    "Sizes",
                    "Colors",
                    "Dimensions",
                    "Price",
                    "Stock",
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
                {products.map((product,id) => (
                  <TableRow
                    key={product.ProductId}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleProductNavigate(product.ProductId)}
                  >
                    <TableCell>{id +1}</TableCell>
                    <TableCell>{product.ProductName}</TableCell>
                    <TableCell>{product.ProductAuthorName}</TableCell>
                    <TableCell>{product.ProductDescription}</TableCell>
                    <TableCell>{product.Category}</TableCell>
                    <TableCell>{product.ProductSizes.join(", ")}</TableCell>
                    <TableCell>{product.ProductColors.join(", ")}</TableCell>
                    <TableCell>{product.Dimensions}</TableCell>
                    <TableCell>{product.ProductPrice}</TableCell>
                    <TableCell>{product.ProductStock}</TableCell>
                    <TableCell>{product.ApprovedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalProducts || 0}
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

export default ProductTable;
