import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchPartnerGpuById } from "../../../../core/modules/Gpu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import GpuEdit from "./GpuEdit";
import ErrorAlert from "components/shared/ErrorAlert";

const GpuPartnerEditContainer = () => {
  const { id } = useParams();
  const apiCall = useCallback(() => {
    return fetchPartnerGpuById(id);
  }, [id]);

  const { data: gpu, setData, error, isLoading } = useFetch(apiCall);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />
  }

  return (
    <>
      <GpuEdit gpu={gpu[0]} onUpdate={(data) => setData(data)} />
    </>
  )
};

export default GpuPartnerEditContainer;
