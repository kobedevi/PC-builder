import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updateOriginalGpu } from "../../../../core/modules/Gpu/api";
import { updatePartnerGpu } from "../../../../core/modules/Gpu/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import GpuOriginalForm from "../forms/GpuOriginalForm";
import GpuForm from "../forms/GpuForm";

const GpuEdit = ({ gpu, onUpdate }) => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const [newGpu, setNewGpu] = useState("");
  const [info, setInfo] = useState();


  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(gpu?.idGpuPartner ? updatePartnerGpu(data) : updateOriginalGpu(data))
      .then((data) => {
        onUpdate(data);
        navigate(PossibleRoutes.Gpus, { replace: true });
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  const toggleHide = () => {};
  const refresh = () => {};

  return (
    <>

    {
      gpu?.idGpuPartner && (
        <>
          <h1>Edit Partner GPU</h1>
          {error && <ErrorAlert error={error} />}
          <GpuForm initialData={gpu} onSubmit={handleSubmit} disabled={isLoading} />
        </>
      )
    }

    {
      !gpu?.idGpuPartner && (
        <>
          <h1>Edit Original GPU</h1>
          {error && <ErrorAlert error={error} />}
          <GpuOriginalForm
            initialData={gpu} 
            onUpdate={handleSubmit} 

            setInfo={setInfo}
            errors={error}
            setErrors={setError}
            toggleHide={toggleHide}
            setNewGpu={setNewGpu}
            refresh={refresh}
            disabled={isLoading}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </>
      )
    }
    </>
  );
};

export default GpuEdit;
