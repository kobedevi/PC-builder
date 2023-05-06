import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import { fetchRamById } from "core/modules/Ram/api";
import RamEdit from "./RamEdit";

const RamEditContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchRamById(id);
  }, [id]);

  const { data: ram, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return <RamEdit ram={ram[0]} onUpdate={(data) => setData(data)} />;
};

export default RamEditContainer;
