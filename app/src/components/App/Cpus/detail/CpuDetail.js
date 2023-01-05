import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import ModelContainer from "./Model/ModelContainer";
import { fetchManufacturerById } from "../../../../core/modules/Manufacturer/api";
import useFetch from "../../../../core/hooks/useFetch";
import Spinner from "../../../Design/Spinner";
import Alert from "../../../Design/Alert";

const CpuDetail = ({ cpu }) => {
  const apiCall = useCallback(() => {
    return fetchManufacturerById(cpu.idManufacturer);
  }, [cpu.idManufacturer]);

  const {
    data: brandName,
    error,
    setError,
    isLoading,
    setIsLoading,
    refresh,
  } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <div className="fullSize">
      <div className="detail">
        <Link to={route(PossibleRoutes.CpuEdit, { id: cpu.idProcessor })}>
          {cpu.modelName}
        </Link>
      </div>
      <div className="model">
        <Leva flat={true} oneLineLabels={true} />
        <Canvas linear={false} shadows={true}>
          {isLoading && <Spinner />}
          {error && <Alert color="danger">{error}</Alert>}
          {!isLoading && (
            <ModelContainer
              cpu={cpu}
              brandName={
                brandName[0].manufacturerName
                  ? brandName[0].manufacturerName
                  : "unknown"
              }
            />
          )}
        </Canvas>
      </div>
    </div>
  );
};

export default CpuDetail;
