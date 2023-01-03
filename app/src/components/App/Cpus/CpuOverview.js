import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";

const CpuOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchCpus();
  }, []);

  const { data: cpus, error, setError, isLoading, refresh } = useFetch(apiCall);

  return (
    <>
      <h2>CPU Overview</h2>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info}</Alert>}

      <Link to={PossibleRoutes.CpuCreate} className="btn btn-primary">
        Add CPU
      </Link>

      {isLoading && <Spinner />}

      {cpus && (
        <ul>
          {cpus.map((cpu) => (
            <li key={cpu.idProcessor}>
              <Link
                to={route(PossibleRoutes.CpuDetail, { id: cpu.idProcessor })}
              >{`${cpu.idProcessor} ${cpu.clockSpeed}GHz`}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CpuOverview;
