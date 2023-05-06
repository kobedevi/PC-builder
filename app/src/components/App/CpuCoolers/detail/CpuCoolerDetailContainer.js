import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchCpuCoolerById } from "../../../../core/modules/CPUCooler/api";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import CpuCoolerDetail from "./CpuCoolerDetail";

const CpuCoolerDetailContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchCpuCoolerById(id);
  }, [id]);

  const { data: cooler, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }
  return <CpuCoolerDetail cooler={cooler} />;
};

export default CpuCoolerDetailContainer;
