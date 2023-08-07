import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "components/shared/ErrorAlert";
import { fetchStorageById } from "core/modules/Storage/api";
import StorageEdit from "./StorageEdit";

const StorageEditContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchStorageById(id);
  }, [id]);

  const { data, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  return (
    <StorageEdit
      storage={data}
      onUpdate={(data) => setData(data)}
    />
  );
};

export default StorageEditContainer;
