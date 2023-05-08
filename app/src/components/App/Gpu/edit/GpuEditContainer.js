import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchOriginalGpuById } from "../../../../core/modules/Gpu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import GpuEdit from "./GpuEdit";

const GpuEditContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchOriginalGpuById(id);
  }, [id]);

  const { data: gpu, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return <GpuEdit gpu={gpu[0]} onUpdate={(data) => setData(data)} />;
};

export default GpuEditContainer;
