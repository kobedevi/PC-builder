import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpuCoolers } from "../../../core/modules/CPUCooler/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";

const CpuCoolerOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchCpuCoolers();
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
      {info && <Alert color="info">{info}</Alert>}

      <Link to={PossibleRoutes.CpuCoolerCreate} className="btn btn-primary">
        Add CPU cooler
      </Link>

      {isLoading && <Spinner />}

      {cpuCoolers && (
        <ul>
          {cpuCoolers.map((cc) => (
            <li key={cc.idCpuCooler}>
              <Link
                to={route(PossibleRoutes.CpuCoolerDetail, {
                  id: cc.idCpuCooler,
                })}
              >{`${cc.modelName}`}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CpuCoolerOverview;
