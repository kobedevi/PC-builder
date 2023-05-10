import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updatePsu } from "../../../../core/modules/Psu/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import PsuForm from "../forms/PsuForm";

const PsuEdit = ({ psu, onUpdate }) => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updatePsu(data))
      .then((data) => {
        onUpdate(data);
        navigate(PossibleRoutes.Psus, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1>Edit Power supply</h1>
      {error && <ErrorAlert error={error} />}

      <PsuForm
        initialData={psu}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </>
  );
};

export default PsuEdit;
