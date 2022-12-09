import React, { useState } from "react";
import { useNavigate } from "react-router";
import { axiosCreateRam } from "../../../core/modules/Ram/api";
import { PossibleRoutes } from "../../../core/routing";
import ErrorAlert from "../../shared/ErrorAlert";
import CaseForm from "./create/RamForm";

const CreateRam = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    axiosCreateRam(data)
      .then(() => {
        navigate(PossibleRoutes.Ram, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Create Ram</h2>
      {error && <ErrorAlert error={error} />}
      <CaseForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateRam;
