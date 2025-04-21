import { Breadcrumbs, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Loading from "../../Components/Shared/Loader/Loading";
import { getAllDeals } from "../../redux/Apis/Deals/getAllDeals";
import DealTable from "./Deals-Component/DealsTable";
function Deals() {
  const dispatch = useDispatch();
  const { totalDeals, dealsError, dealsLoading, allDeals } = useSelector(
    (state) => state.deal
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(getAllDeals({ page, pageSize: limit }));
  }, [dispatch, page, limit]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-4">
      <Breadcrumbs aria-label="breadcrumb" className="mb-4" color="primary">
        <Link component={RouterLink} to="/" underline="hover">
          Dashboard
        </Link>
        <Link component={RouterLink} to="/deals" underline="hover">
          Deals
        </Link>
      </Breadcrumbs>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-main text-2xl">All Deals</h2>
        {/* <input
          className="border rounded-2xl outline-none text-main w-1/2 p-2"
          placeholder="Search here by Product Name..."
          value={searchTerm}
          onChange={handleSearch}
        /> */}
      </div>

      {dealsLoading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : dealsError ? (
        <p className="text-red-500">Error: {dealsError}</p>
      ) : (
        <DealTable
          deals={allDeals || []}
        //   page={page}
        //   setPage={setPage}
        //   limit={limit}
        //   setLimit={setLimit}
        //   totalProducts={totalDeals || 0}
        />
      )}
    </div>
  );
}

export default Deals;
