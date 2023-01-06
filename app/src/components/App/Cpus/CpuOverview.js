import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import useAdmin from "../../../core/hooks/useAdmin";

const CpuOverview = () => {
  const [info, setInfo] = useState();
  const [cpu, setCpu] = useState();

  const {
    data: cpus,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(fetchCpus);

  const admin = useAdmin();

  const onUpdate = () => {
    setCpu(null);
    refresh();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <>
      {info && <Alert color="info">{info}</Alert>}
      <h2>CPU Overview</h2>
      <Link to={PossibleRoutes.CpuCreate} className="btn btn-primary">
        Add CPU
      </Link>
      <ul>
        {cpus.map((cpu) => (
          <li key={cpu.idProcessor}>
            <Link
              to={route(PossibleRoutes.CpuDetail, { id: cpu.idProcessor })}
            >{`${cpu.modelName} ${cpu.clockSpeed}GHz`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CpuOverview;
