import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchPsus } from "../../../core/modules/Psu/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";

const PsuOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchPsus();
  }, []);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  return (
    <>
      <h2>Power supply Overview</h2>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info}</Alert>}

      <Link to={PossibleRoutes.PsuCreate} className="btn btn-primary">
        Add Power supply
      </Link>

      {isLoading && <Spinner />}

      {data && (
        <ul>
          {data.map((psu) => (
            <li key={psu.idPsu}>{`${psu.idPsu} ${psu.modelName}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PsuOverview;
