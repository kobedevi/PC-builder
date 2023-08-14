import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchPsuById } from "../../../../core/modules/Psu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import PsuDetail from "./PsuDetail";

const PsuDetailContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchPsuById(id);
  }, [id]);

  const { data: psu, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return <PsuDetail psu={{ ...psu, modular: psu.modular >= 1 ? true : false}} />;
};

export default PsuDetailContainer;
