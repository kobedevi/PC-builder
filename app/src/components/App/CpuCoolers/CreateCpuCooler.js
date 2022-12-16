import React, { useState } from "react";
import { useNavigate } from "react-router";
import { axiosCreateCpuCooler } from "../../../core/modules/CPUCooler/api";
import { PossibleRoutes } from "../../../core/routing";
import ErrorAlert from "../../shared/ErrorAlert";
import CpuCoolerForm from "./create/CpuCoolerForm";

const CreateCpuCooler = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    // TODO: CPUSOCKETS is always 1 change behind
    // axiosCreateCpuCooler(data)
    //   .then(() => {
    //     navigate(PossibleRoutes.CpuCoolers, { replace: true });
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     setIsLoading(false);
    //   });
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
