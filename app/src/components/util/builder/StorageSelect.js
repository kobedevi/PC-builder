import { useCallback, useState, useEffect } from "react";
import useFetch from "../../../core/hooks/useFetch";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import { fetchCompatibleStorage, fetchFilteredStorage } from "core/modules/Storage/api";
import { v4 as uuidv4 } from "uuid";
import BuilderProductCard from "components/Design/BuilderProductCard";


const StorageSelect = ({warnings, strictMode, setStrictMode, currentBuild, updateBuild, drives, setDrives, smallSlots, largeSlots, m2Slots, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    if(!strictMode) {
      return fetchCompatibleStorage(undefined);
    } else {
    return fetchCompatibleStorage(currentBuild.motherboard.idMotherboard);
  }
  }, [currentBuild.motherboard.idMotherboard, strictMode]);
  
  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }
  
  const onClick = (product) => {
    setDrives(currentDrives => [
      ...currentDrives,
      {
        localId:uuidv4(), 
        ...product
      }
    ]);
  }

  const handleStrict = () => {
    setStrictMode(!strictMode);
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

      <div className="custom-control custom-checkbox text">
        <input type="checkbox" id="strictMode" name="strictMode" className="custom-control-input" onChange={handleStrict} checked={strictMode}/>
        <label className="custom-control-label" htmlFor="strictMode" style={{marginLeft: ".5rem"}}>Strict mode<span style={{color: "#C665EA"}}>*</span></label>
        <p style={{opacity:.5, fontSize: "1rem"}}>You will see all compatible products, but for some you might not have enough connections</p>
      </div>

      {
        warnings && (
          <Alert color="warning">
            {Array.from(warnings)}
          </Alert>
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
              query && <Result filter={fetchFilteredStorage} result={query}/>
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
                  {data.map((product) => (
                    <li key={product.idStorage}>
                      <BuilderProductCard
                        product={product}
                        link={PossibleRoutes.Detail}
                        id={product.idRam}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        Capacity: {product.capacity}<br/>
                        Storage Type: {product.storageType}<br/>
                        {product.RPM > 0 ? 'Speed in RPM: ' + product.RPM :''}
                        <button type="button" onClick={() => onClick(product)}>Add</button>
                      </BuilderProductCard>
                     
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

export default StorageSelect;
