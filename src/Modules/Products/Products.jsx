import { Breadcrumbs, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Loading from "../../Components/Shared/Loader/Loading";
import { getAllProducts } from "../../redux/Apis/Products/getAllProductsApi";
import ProductTable from "./Product-Components/ProductTable";
function Products() {
  const dispatch = useDispatch();
  const { totalProducts, productsError, productsLoading, allProducts } =
    useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(getAllProducts({ page, pageSize: limit }));
  }, [dispatch, page, limit]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredProducts = allProducts?.filter((product) =>
    product?.ProductName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-4">
      <Breadcrumbs aria-label="breadcrumb" className="mb-4" color="primary">
        <Link component={RouterLink} to="/" underline="hover">
          Dashboard
        </Link>
        <Link component={RouterLink} to="/products" underline="hover">
          Products
        </Link>
      </Breadcrumbs>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-main text-2xl">All Products</h2>
        <input
          className="border rounded-2xl outline-none text-main w-1/2 p-2"
          placeholder="Search here by Product Name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {productsLoading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : productsError ? (
        <p className="text-red-500">Error: {productsError}</p>
      ) : (
        <ProductTable
        products={filteredProducts || []}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalProducts={totalProducts || 0}
        />
      )}
    </div>
  );
}

export default Products;
