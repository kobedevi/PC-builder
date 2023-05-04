import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updateCase } from "../../../../core/modules/Case/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import CaseForm from "../forms/CaseForm";

const CaseEdit = ({ pccase, onUpdate }) => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateCase(data))
      .then((data) => {
        onUpdate(data);
        navigate(PossibleRoutes.Cases, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };
  return (
    <>
      <h1>Edit Case</h1>
      {error && <ErrorAlert error={error} />}
      
      <CaseForm
        initialData={pccase}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </>
  );
};

export default CaseEdit;
