import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchStorageById } from "../../../../core/modules/Storage/api";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import StorageDetail from "./StorageDetail";

const StorageDetailContainer = () => {
  const { id } = useParams();

  const apiCall = useCallback(() => {
    return fetchStorageById(id);
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
      <StorageDetail
        storage={{ ...data }}
      />
    );
  }
};

export default StorageDetailContainer;
