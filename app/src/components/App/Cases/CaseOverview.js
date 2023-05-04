import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCases } from "../../../core/modules/Case/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import useAuthApi from "core/hooks/useAuthApi";
import ErrorAlert from "components/shared/ErrorAlert";

const CaseOverview = () => {
  const withAuth = useAuthApi();
  const [info, setInfo] = useState();

  const { data, error, setError, isLoading, refresh } =
    useFetch(fetchCases);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <>
      <h2>Case Overview</h2>
      {info && <Alert color="info">{info}</Alert>}

      <Link to={PossibleRoutes.CaseCreate} className="btn btn-primary">
        Add Case
      </Link>

      {data && (
        <ul>
          {data.map((c) => (
            <li key={c.idCase}>
              <Link
                to={route(PossibleRoutes.CaseDetail, {
                  id: c.idCase,
                })}
              >{`${c.modelName}`}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};












export default CaseOverview;
