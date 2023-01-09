import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createMotherboard } from "../../../../core/modules/Motherboard/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import MotherboardForm from "../forms/MotherboardForm";

const CreateMotherboard = () => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(createMotherboard(data))
      .then(() => {
        navigate(PossibleRoutes.Motherboards, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Create motherboard</h2>
      {error && <ErrorAlert error={error} />}
      <MotherboardForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateMotherboard;
