import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useAuthApi from "../../../core/hooks/useAuthApi";
import useFetch from "../../../core/hooks/useFetch";
import { fetchMotherboards } from "../../../core/modules/Motherboard/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";

const MotherboardOverview = () => {
  const withAuth = useAuthApi();
  const [info, setInfo] = useState();

  const { data, error, setError, isLoading, refresh } =
    useFetch(fetchMotherboards);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <>
      <h2>Motherboard Overview</h2>
      {info && <Alert color="info">{info}</Alert>}

      <Link to={PossibleRoutes.MotherboardCreate} className="btn btn-primary">
        Add Motherboard
      </Link>

      {data && (
        <ul>
          {data.map((mb) => (
            <li key={mb.idMotherboard}>
              <Link
                to={route(PossibleRoutes.MotherboardDetail, {
                  id: mb.idMotherboard,
                })}
              >{`${mb.modelName}`}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MotherboardOverview;
