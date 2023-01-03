import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useNoAuthApi from "../../../../core/hooks/useNoAuthApi";
import { updateCpu } from "../../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../../core/routing";
import CpuForm from "../create/CpuForm";

const CpuEdit = ({ cpu, onUpdate }) => {
  const withAuth = useNoAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    withAuth(updateCpu(data))
      .then((data) => {
        // let parent know data is updated
        onUpdate(data);
        //   <Navigate to={PossibleRoutes.PartsOverview} replace />
        navigate(
          route(PossibleRoutes.CpuDetail, {
            id: data.idProcessor,
          })
        );
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1>Edit CPU</h1>
      {console.log(cpu)}
      {/* {error && <ErrorAlert error={error.message} />} */}

      <CpuForm initialData={cpu} onSubmit={handleSubmit} disabled={isLoading} />
    </>
  );
};

export default CpuEdit;
