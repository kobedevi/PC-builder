import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchMotherboardById } from "../../../../core/modules/Motherboard/api";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import MotherboardDetail from "./MotherboardDetail";

const MotherboardDetailContainer = () => {
  const { id } = useParams();

  const apiCall = useCallback(() => {
    return fetchMotherboardById(id);
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
      <MotherboardDetail
        motherboard={{ ...data[0], wifi: data[0].wifi >= 1 ? true : false }}
      />
    );
  }
};

export default MotherboardDetailContainer;
