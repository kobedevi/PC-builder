import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchMotherboardById } from "../../../../core/modules/Motherboard/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import MotherboardEdit from "./MotherboardEdit";
import ErrorAlert from "components/shared/ErrorAlert";

const MotherboardEditContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchMotherboardById(id);
  }, [id]);

  const { data, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />
  }


  return (
    <MotherboardEdit
      motherboard={{ ...data }}
      onUpdate={(data) => setData(data)}
    />
  );
};

export default MotherboardEditContainer;
