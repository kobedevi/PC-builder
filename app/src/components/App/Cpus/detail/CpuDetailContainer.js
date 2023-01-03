import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchCpu } from "../../../../core/modules/CPU/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import CpuDetail from "./CpuDetail";

const CpuDetailContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchCpu(id);
  }, [id]);

  const { data: cpu, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return <CpuDetail cpu={cpu[0]} />;
};

export default CpuDetailContainer;
