import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchRam } from "../../../core/modules/Ram/api";
import { PossibleRoutes } from "../../../core/routing";
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

      <Link className="nav-link" to={PossibleRoutes.RamCreate}>
        Add Ram
      </Link>

      {isLoading && <Spinner />}

      {ram && (
        <ul>
          {ram.map((r) => (
            <li key={r.idRam}>{`${r.modelName}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RamOverview;
