import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import { fetchRamById } from "core/modules/Ram/api";
import RamEdit from "./RamEdit";
import ErrorAlert from "components/shared/ErrorAlert";

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
    return <ErrorAlert error={error} />
  }

  return <RamEdit ram={ram} onUpdate={(data) => setData(data)} />;
};

export default RamEditContainer;
