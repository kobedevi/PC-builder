import { useCallback, useState, useEffect } from "react";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { fetchCompatibleCpus, fetchCompatibleFilteredCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import { fetchCpuByIdBuilder } from '../../../core/modules/CPU/api';
import Pagination from "components/Design/Pagination";
import CpuResult from "./CpuResult";


const CpuSelect = ({currentBuild, updateBuild, idCpuSocket, cooler, updateFields}) => {
  const [info, setInfo] = useState([]);
  const [productInfo, setProductInfo] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const apiCall = useCallback(() => {
    return fetchCompatibleCpus(page, perPage);
  }, [page, perPage]);

  const {
    data: cpus,
    error,
    setError,
    isLoading,
    refresh,
  } = useNoAuthFetch(apiCall);


  
  const totalTdp = Math.round(( parseInt((currentBuild.cpu.wattage ??=0)) + parseInt((currentBuild.gpu.wattage ??=0))  + parseInt(((currentBuild.motherboard.sataPorts ??=0) * 5) + 75)) / 50)*50;

  useEffect(() => {
    if(totalTdp > currentBuild.psu?.wattage) {
      updateFields({
        idPsu: ''
      })
      updateBuild({
        psu: {}
      })
      if(currentBuild.psu) {
        setInfo([])
        setInfo(info => [...info, 'Incompatible Power supply removed, insufficient amount of power.'])
      }
    }
  }, [totalTdp])


  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

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
      if(currentBuild.motherboard?.idMotherboard) {
        if(Object.keys(currentBuild.motherboard).length > 0) {
          updateBuild({
            motherboard: {},
          })
          setInfo(info => [...info, 'Incompatible motherboard removed'])
        }
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
              query && (
              <CpuResult 
                filter={fetchCompatibleFilteredCpus}
                setProductInfo={setProductInfo}
                currentBuild={currentBuild}
                onClick={onClick}
                result={query}
              />
              )
            }

            {
              !query && (
                <>
                  <ul className="productList">
                    {cpus.cpus.map((cpu) => {
                      const disabled = cpu.idProcessor === currentBuild.cpu.idProcessor ? true : false;
                      return(
                      <li key={cpu.idProcessor}>
                        <BuilderProductCard
                          setProductInfo={setProductInfo}
                          product={cpu}
                          link={PossibleRoutes.Detail}
                          id={cpu.idProcessor}
                          currentBuild={currentBuild}
                        >
                          <p>
                            Manufacturer: {cpu.manufacturerName}<br/>
                            TDP: {cpu.wattage ? `${cpu.wattage}W` : 'Unknown'}<br/>
                            Base Clock: {cpu.clockSpeed}Ghz<br/>
                            Cores: {cpu.cores}<br/>
                            Socket: {cpu.socketType}<br/>
                            <b className="price">MSRP Price: {cpu.price ? `€${cpu.price}` : 'Unknown'}</b>
                          </p>
                          <button type="button" onClick={() => onClick(cpu)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
                        </BuilderProductCard>
                      </li>
                    )})}
                  </ul>
                  <Pagination 
                    page={page}
                    perPage={perPage}
                    pageAmount={cpus.pageAmount}
                    perPageClick={handlePerPageClick}
                    onClick={handlePageClick}
                  />
                </>
              )
            }

            {
              productInfo && (
                <InfoModal
                  onDismiss={() => setProductInfo(null)}
                  fetcher={fetchCpuByIdBuilder}
                  productInfo={productInfo}
                />
              )
            }
          </>
        )
      }
    </>
  );
};

export default CpuSelect;
