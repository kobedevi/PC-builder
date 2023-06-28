import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import { fetchCompatiblePsu, fetchFilteredPsus } from "core/modules/Psu/api";
import BuilderProductCard from "components/Design/BuilderProductCard";

const PsuSelect = ({minWat, currentBuild, updateBuild, updateFields, idPsu, }) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchCompatiblePsu(minWat);
  }, [minWat]);
  
  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (product) => {
    updateBuild({
      psu: product
    })
    updateFields({
      idPsu: product.idPsu
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
              query && <Result filter={fetchFilteredPsus} result={query}/>
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
                    const disabled = product.idPsu === currentBuild.psu.idPsu ? true : false;
                    return(
                    <li key={product.idRam}>
                      <BuilderProductCard
                        product={product}
                        link={PossibleRoutes.Detail}
                        id={product.idPsu}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        Modular: {product.modular? "Yes": "No"}<br/>
                        Wattage: {product.wattage}W
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

export default PsuSelect;
