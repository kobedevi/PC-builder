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
import { fetchCompatibleRam, fetchFilteredRam } from "core/modules/Ram/api";

const RamSelect = ({memorySlots, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchCompatibleRam(memorySlots);
  }, [memorySlots]);
  
  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
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
              query && <Result filter={fetchFilteredRam} result={query}/>
            }
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
                    <li key={product.idMotherboard}>
                      <ProductCard
                        product={product}
                        link={PossibleRoutes.Detail}
                        id={product.idMotherboard}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        Ram type: {product.type}<br/>
                        Amount of sticks: {product.stickAmount}<br/>
                        Size per stick: {product.sizePerStick} GB<br/>
                        <strong>Total</strong> size: {product.sizePerStick * product.stickAmount} GB<br/>
                        Ram speed: {product.speed}MHz<br/>
                      </ProductCard>
                      <button type="button" onClick={e => updateFields({idRam: product.idRam})}>Choose</button>
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

export default RamSelect;
