import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";

const CpuCoolerOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchCpus();
  }, []);

  const {
    data: cpuCoolers,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  return (
    <>
      <h2>CPU cooler Overview</h2>
      {error && <Alert color="danger">{error.message}</Alert>}

      <Link className="nav-link" to={PossibleRoutes.CpuCoolerCreate}>
        Add CPU cooler
      </Link>

      {isLoading && <Spinner />}
      {info && <Alert color="info">{info}</Alert>}

      {cpuCoolers && (
        <ul>
          {cpuCoolers.map((cc) => (
            <li key={cc.id_cpu}>{`${cc.idProcessor} ${cc.clockSpeed}GHz`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CpuCoolerOverview;
