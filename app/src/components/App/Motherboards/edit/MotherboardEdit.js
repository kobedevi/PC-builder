import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useNoAuthApi from "../../../../core/hooks/useNoAuthApi";
import { updateMotherboard } from "../../../../core/modules/Motherboard/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import MotherboardForm from "../forms/MotherboardForm";

const MotherboardEdit = ({ motherboard, onUpdate }) => {
  const withAuth = useNoAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateMotherboard(data))
      .then((data) => {
        onUpdate(data);
        navigate(PossibleRoutes.Motherboards, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1>Edit Motherboard</h1>
      {error && <ErrorAlert error={error} />}

      <MotherboardForm
        initialData={motherboard}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </>
  );
};

export default MotherboardEdit;
