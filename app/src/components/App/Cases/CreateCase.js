import React, { useState } from "react";
import { useNavigate } from "react-router";
import { axiosCreateCase } from "../../../core/modules/Case/api";
import { PossibleRoutes } from "../../../core/routing";
import ErrorAlert from "../../shared/ErrorAlert";
import CaseForm from "./create/CaseForm";

const CreateCase = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    axiosCreateCase(data)
      .then(() => {
        navigate(PossibleRoutes.Cases, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Create Case</h2>
      {error && <ErrorAlert error={error} />}
      <CaseForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateCase;
