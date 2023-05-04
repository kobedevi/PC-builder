import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchCaseById } from "../../../../core/modules/Case/api";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import CaseDetail from "./CaseDetail";

const CaseDetailContainer = () => {
  const { id } = useParams();

  const apiCall = useCallback(() => {
    return fetchCaseById(id);
  }, [id]);

  const { data, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (data) {
    return (
      <CaseDetail
        pccase = {{ ...data[0]}}
      />
    );
  }
};

export default CaseDetailContainer;
