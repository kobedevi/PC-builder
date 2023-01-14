import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchCpuCoolerById } from "../../../../core/modules/CPUCooler/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import CpuCoolerEdit from "./CpuCoolerEdit";

const CpuCoolerEditContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchCpuCoolerById(id);
  }, [id]);

  const { data: cooler, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <CpuCoolerEdit
      cooler={cooler[0]}
      sockets={cooler}
      onUpdate={(data) => setData(data)}
    />
  );
};

export default CpuCoolerEditContainer;
