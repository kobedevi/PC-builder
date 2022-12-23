import React, { useState } from "react";
import { useNavigate } from "react-router";
import { axiosCreateGpu } from "../../../core/modules/Gpu/api";
import { PossibleRoutes } from "../../../core/routing";
import ErrorAlert from "../../shared/ErrorAlert";
import GpuForm from "./create/GpuForm";

const CreateGpu = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    axiosCreateGpu(data)
      .then(() => {
        navigate(PossibleRoutes.Gpus, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Create Gpu</h2>
      {error && <ErrorAlert error={error} />}
      <GpuForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateGpu;
