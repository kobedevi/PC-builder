import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createCpuCooler } from "../../../../core/modules/CPUCooler/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import CpuCoolerForm from "../forms/CpuCoolerForm";

const CreateCpuCooler = () => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(createCpuCooler(data))
      .then(() => {
        navigate(PossibleRoutes.CpuCoolers, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Create CPU cooler</h2>
      {error && <ErrorAlert error={error} />}
      <CpuCoolerForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateCpuCooler;
