import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../../core/hooks/useFetch';
import { fetchCpus } from '../../../core/modules/CPU/api';
import { PossibleRoutes } from '../../../core/routing'
import Alert from '../../Design/Alert';
import Spinner from '../../Design/Spinner';

const CpuOverview = () => {

  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchCpus();
  }, [])

  const {
    data: cpus,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  return (
    <>
      <h2>CpuOverview</h2>
      {
        error && <Alert color="danger">{error.message}</Alert>
      }

      <Link className="nav-link" to={PossibleRoutes.CpuCreate}>Add Cpu</Link>

      {
        isLoading && <Spinner/>
      }
      {
        info && <Alert color="info">{info}</Alert>
      }
      
      {
        cpus && (
          <ul>
            {
              cpus.map((cpu) => (
                <li key={cpu.id_cpu}>
                  {`${cpu.idProcessor} ${cpu.clockSpeed}GHz`} 
                </li>
              ))
            }
          </ul>
        )
      }
    </>
  )
}

export default CpuOverview