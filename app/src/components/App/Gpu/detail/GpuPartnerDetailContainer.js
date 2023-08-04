import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchPartnerGpuById } from "../../../../core/modules/Gpu/api";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import GpuDetail from "./GpuDetail";

const GpuPartnerDetailContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchPartnerGpuById(id);
  }, [id]);

  const { data: gpu, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }
  return <GpuDetail gpu={gpu} />;
};

export default GpuPartnerDetailContainer;
