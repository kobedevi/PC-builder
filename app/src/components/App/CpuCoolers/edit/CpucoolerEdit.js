import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useNoAuthApi from "../../../../core/hooks/useNoAuthApi";
import { PossibleRoutes } from "../../../../core/routing";
import { updateCpuCooler } from "../../../../core/modules/CPUCooler";
import ErrorAlert from "../../../shared/ErrorAlert";
import CpuForm from "../forms/CpuForm";

const CpucoolerEdit = ({ cpu, onUpdate }) => {
  const withAuth = useNoAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateCpuCooler(data))
      .then((data) => {
        onUpdate(data);
        navigate(PossibleRoutes.Cpus, { replace: true });
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

      <CpuForm initialData={cpu} onSubmit={handleSubmit} disabled={isLoading} />
    </>
  );
};

export default CpucoolerEdit;
