import React, { useCallback, useState } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchPartnerGpus } from "../../../../core/modules/Gpu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "core/routing";

const PartnerGpuOverview = () => {
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchPartnerGpus();
  }, []);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  return (
    <>
      <h4>Partner GPU:</h4>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info}</Alert>}

      {isLoading && <Spinner />}
      {data && (
        <ul>
          {data.map((x) => (
            <li key={x.idGpuPartner}>
              <Link to={route(PossibleRoutes.GpuPartnerDetail, { id: x.idGpuPartner })}>
                {`${x.modelName}`}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PartnerGpuOverview;
