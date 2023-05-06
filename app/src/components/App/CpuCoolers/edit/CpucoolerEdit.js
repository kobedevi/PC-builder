import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { PossibleRoutes } from "../../../../core/routing";
import { updateCpuCooler } from "../../../../core/modules/CPUCooler/api";
import ErrorAlert from "../../../shared/ErrorAlert";
import CpuCoolerForm from "../forms/CpuCoolerForm";

const CpuCoolerEdit = ({ cooler, onUpdate }) => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateCpuCooler(data))
      .then(() => {
        navigate(PossibleRoutes.CpuCoolers, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };


  return (
    <>
      <h1>Edit CPU Cooler</h1>
      {error && <ErrorAlert error={error} />}
      <CpuCoolerForm
        initialData={cooler}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </>
  );
};

export default CpuCoolerEdit;
