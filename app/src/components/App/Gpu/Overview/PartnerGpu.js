import React, { useCallback, useState } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchPartnerGpus } from "../../../../core/modules/Gpu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";

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
            <li key={x.idGpu}>{`${x.idGpu}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PartnerGpuOverview;
