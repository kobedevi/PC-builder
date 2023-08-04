import { useCallback, useState } from "react";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import { fetchCompatibleCpuCoolers, fetchFilteredCpuCoolers } from "core/modules/CPUCooler/api";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import { fetchCpuCoolerByIdBuilder } from '../../../core/modules/CPUCooler/api';

const CpuCoolerSelect = ({currentBuild, updateBuild, idCpuCooler, idCpu, updateFields}) => {
  const [info, setInfo] = useState();
  const [productInfo, setProductInfo] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchCompatibleCpuCoolers(idCpu);
  }, [idCpu]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (cooler) => {
    updateBuild({
      cpucooler: cooler
    })
    updateFields({
      idCpuCooler: cooler.idCpuCooler,
      cooler: cooler.idCpuSocket,
      maxDepth: cooler.height
    })
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
        data && (
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
              query && <Result filter={fetchFilteredCpuCoolers} result={query}/>
            }
            {(data.length === 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              !query && (
                <ul className="productList">
                  {data.map((product) => {
                    const disabled = product.idCpuCooler === currentBuild.cpucooler.idCpuCooler ? true : false;
                    return (
                    <li key={product.idCpuCooler}>
                      <BuilderProductCard
                        setProductInfo={setProductInfo}
                        product={product}
                        link={PossibleRoutes.Detail}
                        id={product.idCpuCooler}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        compatible sockets: {product.socketType.join(', ')}<br/>
                        <button type="button" onClick={() => onClick(product)} disabled={disabled} >{!disabled ? 'Add' : 'Added'}</button>
                      </BuilderProductCard>
                    </li>
                  )})}
                </ul>
              )
            }

            {
              productInfo && (
                <InfoModal
                  onDismiss={() => setProductInfo(null)}
                  fetcher={fetchCpuCoolerByIdBuilder}
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

export default CpuCoolerSelect;
