import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchPartnerGpus } from "../../../core/modules/Gpu/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import OriginalGpuOverview from "./Overview/OriginalGpu";
import PartnerGpuOverview from "./Overview/PartnerGpu";

const GpuOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchPartnerGpus();
  }, []);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  return (
    <>
      <h2>GPU Overview</h2>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info}</Alert>}

      <Link to={PossibleRoutes.GpuCreate}>Add GPU</Link>

      <div>
        <OriginalGpuOverview />
        <PartnerGpuOverview />
      </div>
    </>
  );
};

export default GpuOverview;
