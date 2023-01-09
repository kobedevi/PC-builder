import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createCase } from "../../../../core/modules/Case/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import CaseForm from "../forms/CaseForm";

const CreateCase = () => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(createCase(data))
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
