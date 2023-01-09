import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createRam } from "../../../../core/modules/Ram/api";
import { PossibleRoutes } from "../../../../core/routing";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import RamForm from "../forms/RamForm";

const CreateRam = () => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(createRam(data))
      .then(() => {
        navigate(PossibleRoutes.Ram, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <div>
      <h2>Create Ram</h2>
      <RamForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateRam;
