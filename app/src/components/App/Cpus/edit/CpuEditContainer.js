import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchCpu } from "../../../../core/modules/CPU/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import CpuEdit from "./CpuEdit";

const CpuEditContainer = () => {
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

  return <CpuEdit cpu={cpu[0]} />;
};

export default CpuEditContainer;
