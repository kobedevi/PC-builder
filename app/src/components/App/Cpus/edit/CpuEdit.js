import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useNoAuthApi from "../../../../core/hooks/useNoAuthApi";
import { updateCpu } from "../../../../core/modules/CPU/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import CpuForm from "../forms/CpuForm";

const CpuEdit = ({ cpu, onUpdate }) => {
  const withAuth = useNoAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateCpu(data))
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
      <h1>Edit CPU</h1>
      {error && <ErrorAlert error={error} />}

      <CpuForm initialData={cpu} onSubmit={handleSubmit} disabled={isLoading} />
    </>
  );
};

export default CpuEdit;
