import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import useAdmin from "../../../core/hooks/useAdmin";
import DeleteButton from "components/Design/DeleteButton";
import DeleteCpu from "./Delete/DeleteCpu";

const CpuOverview = () => {
  const [info, setInfo] = useState();
  const [deleteCpu, setDeleteCpu] = useState();

  const {
    data: cpus,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(fetchCpus);

  const admin = useAdmin();

  const onUpdate = () => {
    setDeleteCpu(null);
    refresh();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>CPU Overview</h2>

      {
        error && (
          <ErrorAlert error={error} />
        )
      }

      {
        cpus && (
          <>

            {
              info && <Alert color="info">{info}</Alert>
            }

            <Link to={PossibleRoutes.CpuCreate} className="btn btn-primary">
              Add CPU
            </Link>

            <ul>
              {cpus.map((cpu) => (
                <li key={cpu.idProcessor}>
                  <Link
                    to={route(PossibleRoutes.CpuDetail, { id: cpu.idProcessor })}
                  >{`${cpu.modelName} ${cpu.clockSpeed}GHz`}</Link> 
                  <DeleteButton deleter={() => setDeleteCpu(cpu)}/>
                </li>
              ))}
            </ul>

            {
              deleteCpu && (
                <DeleteCpu
                  cpu={deleteCpu}
                  onUpdate={onUpdate}
                  onDismiss={() => setDeleteCpu(null)}
                  setError={setError}
                  setInfo={setInfo}
                />
              )
            }

          </>
        )
      }
    </>
  );
};

export default CpuOverview;
