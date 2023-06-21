import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import { fetchCompatibleCpuCoolers, fetchFilteredCpuCoolers } from "core/modules/CPUCooler/api";

const CpuCoolerSelect = ({idCpu, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchCompatibleCpuCoolers(idCpu);
  }, [idCpu]);
  
  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (cooler) => {
    updateFields({
      idCpuCooler: cooler.idCpuCooler,
      cooler: cooler.idCpuSocket,
      maxDepth: cooler.height,
      idMotherboard: ''
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
            {/* TODO: Clear next data: 
            example -> you choose an AM5 cooler, it has multiple compatible products, you go back to cpus and change your mind.
            cpu cooler is still saved and you can continue to a following step */}
            {(data.length === 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              !query && (
                <ul className="movieList">
                  {data.map((product) => (
                    <li key={product.idCpuCooler}>
                      <ProductCard
                        product={product}
                        link={PossibleRoutes.Detail}
                        id={product.idProcessor}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        compatible sockets: {product.socketType.join(', ')}<br/>
                      </ProductCard>
                      <button type="button" onClick={() => onClick(product)}>Choose</button>
                      {/* <button type="button" onClick={e => updateFields({idCpuCooler: product.idCpuCooler})}>Choose</button> */}
                    </li>
                  ))}
                </ul>
              )
            }
          </>
        )
      }
    </>
  );
};

export default CpuCoolerSelect;
