import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchMotherboards } from "../../../core/modules/Motherboard/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";

const MotherboardOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchMotherboards();
  }, []);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  return (
    <>
      <h2>Motherboard Overview</h2>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info}</Alert>}

      <Link to={PossibleRoutes.MotherboardCreate} className="btn btn-primary">
        Add Motherboard
      </Link>

      {isLoading && <Spinner />}

      {data && (
        <ul>
          {data.map((mb) => (
            <li
              key={mb.idMotherboard}
            >{`${mb.idMotherboard} ${mb.modelName}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MotherboardOverview;
