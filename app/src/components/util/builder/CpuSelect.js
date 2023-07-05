import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus, fetchFilteredCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import BuilderProductCard from "components/Design/BuilderProductCard";

const CpuSelect = ({currentBuild, updateBuild, idCpuSocket, cooler, updateFields}) => {
  const [info, setInfo] = useState([]);
  const [query, setQuery] = useState('');

  const {
    data: cpus,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(fetchCpus);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (cpu) => {
    updateBuild({
      cpu
    })
    
    if(cpu.idCpuSocket !== idCpuSocket) {
      setInfo([]);
      updateFields({
        idCpu: cpu.idProcessor,
        idCpuSocket: cpu.idCpuSocket,
        // If new cpu has other socket reset motherboard
        idMotherboard: '',
      })
      if(Object.keys(currentBuild.motherboard).length > 0) {
        updateBuild({
          motherboard: {},
        })
        setInfo(info => [...info, 'Incompatible motherboard removed'])
      }

      // If new cpu is not compatible with old cooler, reset
      if(!cooler.includes(cpu.idCpuSocket)) {
        if(Object.keys(currentBuild.cpucooler).length > 0) {
          updateBuild({
            cpucooler: {},
          })
          setInfo(info => [...info, 'Incompatible CPU cooler removed'])
        }
        updateBuild({
          cpucooler: {},
        })
        updateFields({
          idCpuCooler: '',
        })
      }
    } else {
      updateFields({
        idCpu: cpu.idProcessor,
      })
    }
  }

  return (
    <>

      {
        error && (
          <ErrorAlert error={error} />
        )
      }

      {
        isLoading && (
          <Spinner />
        )
      }

      {
        cpus && (
          <>

            {
              info && <Alert color="info">{info}</Alert>
            }

            <SearchForm
              isPublic={true}
              onSubmit={onSubmit}
              setQuery={setQuery}
            />

            {
              query && <Result filter={fetchFilteredCpus} result={query}/>
            }

            {
              !query && (
                <ul className="productList">
                  {cpus.map((cpu) => {
                    const disabled = cpu.idProcessor === currentBuild.cpu.idProcessor ? true : false;
                    return(
                    <li key={cpu.idProcessor}>
                      <BuilderProductCard
                        product={cpu}
                        link={PossibleRoutes.Detail}
                        id={cpu.idProcessor}
                      >
                        <p>
                          Manufacturer: {cpu.manufacturerName}<br/>
                          Base Clock: {cpu.clockSpeed}Ghz<br/>
                          Cores: {cpu.cores}<br/>
                          Socket: {cpu.socketType}
                        </p>
                        <button type="button" onClick={() => onClick(cpu)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
                      </BuilderProductCard>
                    </li>
                  )})}
                </ul>
              )
            }
          </>
        )
      }
    </>
  );
};

export default CpuSelect;
