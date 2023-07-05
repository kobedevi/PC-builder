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
import { fetchCompatibleMotherboard, fetchFilteredMotherboards } from "core/modules/Motherboard/api";
import BuilderProductCard from "components/Design/BuilderProductCard";

const MotherboardSelect = ({currentBuild, updateBuild, idMotherboard, idCpu, width, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchCompatibleMotherboard(idCpu);
  }, [idCpu]);
  
  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (product) => {
    updateBuild({
      motherboard: product
    })
    updateFields({
      idMotherboard: product.idMotherboard,
      idRamType: product.idRamType,
      memorySlots: product.memorySlots,
      pcieSlots: product.pcieSlots,
      maxWidth: product.width,
      maxHeight: product.height
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
              query && <Result filter={fetchFilteredMotherboards} result={query}/>
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
                    const disabled = product.idMotherboard === currentBuild.motherboard.idMotherboard ? true : false;
                    return(
                    <li key={product.idMotherboard}>
                      <BuilderProductCard
                        product={product}
                        link={PossibleRoutes.Detail}
                        id={product.idMotherboard}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        Formfactor: {product.formfactor}<br/>
                        SocketType: {product.socketType}<br/>
                        <button type="button" onClick={() => onClick(product)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
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

export default MotherboardSelect;
