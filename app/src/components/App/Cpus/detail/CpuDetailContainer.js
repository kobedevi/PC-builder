import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchCpuById } from "../../../../core/modules/CPU/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import CpuDetail from "./CpuDetail";

const CpuDetailContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchCpuById(id);
  }, [id]);

  const { data: cpu, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }
  return <CpuDetail cpu={cpu} />;
};

export default CpuDetailContainer;
