import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createPartnerGpu } from "../../../../core/modules/Gpu/api";
import { PossibleRoutes } from "../../../../core/routing";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import GpuForm from "../forms/GpuForm";

const CreateGpu = () => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(createPartnerGpu(data))
      .then(() => {
        navigate(PossibleRoutes.Gpus, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>Create Gpu</h2>
      {error && <ErrorAlert error={error} />}
      <GpuForm
        onSubmit={handleSubmit}
        setError={setError}
        disabled={isLoading}
      />
    </div>
  );
};

export default CreateGpu;
