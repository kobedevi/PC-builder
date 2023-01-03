import React, { useState } from "react";
import { useNavigate } from "react-router";
import { axiosCreatePsu } from "../../../core/modules/Psu/api";
import { PossibleRoutes } from "../../../core/routing";
import ErrorAlert from "../../shared/ErrorAlert";
import PsuForm from "./create/PsuForm";

const CreatePsu = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    axiosCreatePsu(data)
      .then(() => {
        navigate(PossibleRoutes.Psus, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2>Create Power supply</h2>
      {error && <ErrorAlert error={error} />}
      <PsuForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreatePsu;
