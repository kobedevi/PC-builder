import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createCpu } from "../../../core/modules/CPU/api";
import { PossibleRoutes } from "../../../core/routing";
import ErrorAlert from "../../shared/ErrorAlert";
import CpuForm from "./create/CpuForm";

const CreateCpu = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    createCpu(data)
      .then(() => {
        navigate(PossibleRoutes.Cpus, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Create CPU</h2>
      {error && <ErrorAlert error={error} />}
      <CpuForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateCpu;
