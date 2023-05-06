import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import RamForm from "../forms/RamForm";
import { updateRam } from "core/modules/Ram/api";

const RamEdit = ({ ram, onUpdate }) => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateRam(data))
      .then((data) => {
        onUpdate(data);
        navigate(PossibleRoutes.Ram, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1>Edit Ram</h1>
      {error && <ErrorAlert error={error} />}

      <RamForm initialData={ram} onSubmit={handleSubmit} disabled={isLoading} />
    </>
  );
};

export default RamEdit;
