import React, { useEffect, useState, useMemo } from "react";
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  TextField,
  Autocomplete,
  MenuItem,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import debounce from "lodash.debounce";

import { getAllReports } from "../../redux/Apis/Reports/getAllReportsApi";
import { getAllUsers } from "../../redux/Apis/Users/getAllusers";

import Loading from "../../Components/Shared/Loader/Loading";
import ReportTable from "./Reports-Components/ReportsTable";

const REPORT_TYPES = ["deal", "product", "user"];

const Reports = () => {
  const dispatch = useDispatch();

  const { reportsError, reportsLoading, reportData } = useSelector((state) => state.report);
  const { allUsers, usersLoading } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState("");
  const [reporter, setReporter] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const debouncedFetchUsers = useMemo(
    () => debounce((searchUsername) => dispatch(getAllUsers({ searchUsername })), 500),
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllUsers({}));
  }, [dispatch]);

  useEffect(() => {
    if (searchInput) debouncedFetchUsers(searchInput);
  }, [searchInput, debouncedFetchUsers]);

  useEffect(() => {
    if (submitted && type && reporter) {
      dispatch(
        getAllReports({
          page,
          pageSize: limit,
          type,
          reporterName: reporter.label,
        })
      );
    }
  }, [dispatch, page, limit, type, reporter, submitted]);

  const handleSearch = () => {
    setPage(1);
    setSubmitted(true);
  };

  const reporterOptions = allUsers?.map((user) => ({
    label: user.Name,
    id: user.id,
  })) || [];

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link underline="hover" component={RouterLink} to="/">
          Dashboard
        </Link>
        <Typography color="text.primary">Reports</Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Autocomplete
          options={reporterOptions}
          value={reporter}
          onChange={(_, newValue) => setReporter(newValue)}
          inputValue={searchInput}
          onInputChange={(_, value) => setSearchInput(value)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Reporter Name"
              required
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {usersLoading && <Typography sx={{ mr: 1 }}>Loading...</Typography>}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          loading={usersLoading}
          sx={{ minWidth: 250 }}
        />

        <TextField
          select
          label="Report Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          sx={{ minWidth: 150 }}
        >
          {REPORT_TYPES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button
          sx={{backgroundColor:theme => theme.palette.primary.main, color: "white"}}
          onClick={handleSearch}
          disabled={!type || !reporter}
        >
          Search
        </Button>
      </Box>

      {reportsLoading ? (
        <Loading />
      ) : reportsError ? (
        <Typography color="error">Error: {reportsError}</Typography>
      ) : (
        <ReportTable
          reports={reportData?.Reports || []}
          totalReports={reportData?.TotalReports || 0}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </Box>
  );
};

export default Reports;
