import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVerifications } from "../../redux/Apis/Verifications/getAllVerificationsApi";
import UserVerificationTable from "./Verifications-components/VerificationTable";
import Loading from "../../Components/Shared/Loader/Loading";
import { Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
function Verifications() {
  const dispatch = useDispatch();
  const { verificationError, verificationLoading, verificationData } =
    useSelector((state) => state.verification);
  useEffect(() => {
    dispatch(getAllVerifications());
  }, [dispatch]);
  return (
    <div className="p-4">
      <Breadcrumbs aria-label="breadcrumb" className="mb-4" color="primary">
        <Link component={RouterLink} to="/" underline="hover">
          Dashboard
        </Link>
        <Link component={RouterLink} to="/verifications" underline="hover">
          Verifications
        </Link>
      </Breadcrumbs>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-main text-2xl">All Verifications</h2>
      </div>

      {verificationLoading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : verificationError ? (
        <p className="text-red-500">Error: {verificationError}</p>
      ) : (
        <UserVerificationTable data={verificationData || []} />
      )}
    </div>
  );
}

export default Verifications;
