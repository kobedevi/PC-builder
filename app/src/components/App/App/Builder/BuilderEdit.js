import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import {useCallback, useState} from 'react'
import Builder from "./Builder";
import Nav from "../Homepage/Nav";
import { fetchBuildInfo } from "core/modules/Builds/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "components/Design/Spinner";
import { PossibleRoutes, route } from "core/routing";

const BuilderEdit = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [build, setBuild] = useState(location.state?.data)

  const apiCall = useCallback(() => {
    return fetchBuildInfo(id);
  }, [id]);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  return (
    <>
    {
      isLoading && (
        <>
          <header>
            <Nav/>
          </header>
          <div className="container" style={{marginTop: "6rem"}}>
            <div className='curvedContainer' style={{gridTemplateColumns: "1fr"}}>
              <Spinner/>
            </div>
          </div>
        </>
      )
    }
    {
      error && (
        <>
          <header>
            <Nav/>
          </header>
          <div className="container" style={{marginTop: "6rem"}}>
            <div className='curvedContainer' style={{gridTemplateColumns: "1fr"}}>
              <ErrorAlert error={error} />
            </div>
          </div>
        </>
      )
    } 
    { data && 
      <>
        {/* If build details do not exist redirect to parent for context */}
        {!build && (
          navigate(route(PossibleRoutes.BuildDetail, {id}), { replace: true })
        )}
        {
          build && <Builder/>
        }
      </>
    }
  </>
  )
}

export default BuilderEdit