import Nav from "../Homepage/Nav"
import { useCallback } from "react"
import useNoAuthFetch from "../../../../core/hooks/useNoAuthFetch";
import { fetchBuild } from "core/modules/Builds/api";
import { useParams } from "react-router-dom";
import ErrorAlert from "components/shared/ErrorAlert";
import Spinner from "components/Design/Spinner";
import ItemListDetail from "components/Design/ItemListDetail";


const BuildDetail = () => {
  
  const { id } = useParams();

  const apiCall = useCallback(() => {
    return fetchBuild(id);
  }, [id]);

  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  return (
    <>
			<Nav/>
      <div className="container" style={{marginTop:"6rem"}}>
        <div className="curvedContainer">
          {isLoading && (
            <Spinner/>
          )}
          {error && (
            <ErrorAlert error={error}/>
          )}
          {data && (
            <>
              <div>
                <ItemListDetail color="info" info={data} />
              </div>
              <div>
                <p>3D model here?</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BuildDetail