import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchRam } from "../../../core/modules/Ram/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";

const RamOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchRam();
  }, []);

  const { data: ram, error, setError, isLoading, refresh } = useFetch(apiCall);

  return (
    <>
      <h2>Ram Overview</h2>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info}</Alert>}

      <Link to={PossibleRoutes.RamCreate} className="btn btn-primary">
        Add Ram
      </Link>

      {isLoading && <Spinner />}

      {ram && (
        <ul>
          {ram.map((r) => (
            <li key={r.idRam}>
              <Link
                to={route(PossibleRoutes.RamDetail, {
                  id: r.idRam,
                })}
              >{`${r.modelName}`}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RamOverview;
