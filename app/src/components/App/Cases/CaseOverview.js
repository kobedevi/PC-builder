import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCases } from "../../../core/modules/Case/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";

const CaseOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchCases();
  }, []);

  const {
    data: cases,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  return (
    <>
      <h2>CaseOverview</h2>
      {error && <Alert color="danger">{error.message}</Alert>}

      <Link className="nav-link" to={PossibleRoutes.CaseCreate}>
        Add Case
      </Link>

      {isLoading && <Spinner />}
      {info && <Alert color="info">{info}</Alert>}

      {cases && (
        <ul>
          {cases.map((casing) => (
            <li key={casing.idCase}>{`${casing.modelName}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CaseOverview;
