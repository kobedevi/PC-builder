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


const StorageSelect = ({currentBuild, updateBuild, drives, setDrives, smallSlots, largeSlots, m2Slots, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [uniqueSet, setUniqueSet] = useState(new Set())

  const apiCall = useCallback(() => {
    return fetchCompatibleStorage(smallSlots, largeSlots, m2Slots);
  }, [smallSlots, largeSlots, m2Slots]);
  
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

  return (
    <>

      {
        error && (
          <ErrorAlert error={error} />
        )
      }

      {
        drives && (
          currentBuild.motherboard.storage.map((item) => {
            const id = item.idStorageType
            const count = drives.filter((obj) => obj.idStorageType === id).length;

            if(count > item.amount){
              return <Alert color="warning"><li>You don't have enough {item.type} connections for all the selected storage</li></Alert>
            }
          })
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
