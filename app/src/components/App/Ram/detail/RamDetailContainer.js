import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchRamById } from "../../../../core/modules/Ram/api";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import RamDetail from "./RamDetail";

const RamDetailContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchRamById(id);
  }, [id]);

  const { data: ram, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }
  return <RamDetail ram={ram} />;
};

export default RamDetailContainer;
