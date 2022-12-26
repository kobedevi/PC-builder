import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchPartnerGpus } from "../../../core/modules/Gpu/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";

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

      <Link className="nav-link" to={PossibleRoutes.GpuCreate}>
        Add GPU
      </Link>

      {isLoading && <Spinner />}
      {info && <Alert color="info">{info}</Alert>}

      {data && (
        <ul>
          {data.map((gpu) => (
            <li key={gpu.idGpu}>{`${gpu.modelName}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default GpuOverview;
