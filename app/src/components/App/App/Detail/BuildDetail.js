import Nav from "../Homepage/Nav"
import { useCallback } from "react"
import useNoAuthFetch from "../../../../core/hooks/useNoAuthFetch";
import { fetchBuild } from "core/modules/Builds/api";
import { useParams } from "react-router-dom";
import ErrorAlert from "components/shared/ErrorAlert";
import Spinner from "components/Design/Spinner";


const BuildDetail = () => {
  
  const { id } = useParams();

  const apiCall = useCallback(() => {
    return fetchBuild(id);
  }, [id]);

  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  return (
    <>
			<Nav/>
      <div className="container">
        <div>Detailpage</div>
        {isLoading && (
          <Spinner/>
        )}
        {error && (
          <ErrorAlert error={error}/>
        )}
        {data && (
          <div>
            <h1>{id}</h1>
            {console.log(data)}
          </div>
        )}
      </div>
    </>
  )
}

export default BuildDetail