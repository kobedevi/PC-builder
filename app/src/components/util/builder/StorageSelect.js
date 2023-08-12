import { useCallback, useState, useEffect } from "react";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import { fetchCompatibleStorage, fetchCompatibleStorageByFilter, fetchStorageByIdBuilder } from "core/modules/Storage/api";
import { v4 as uuidv4 } from "uuid";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import Pagination from "components/Design/Pagination";
import StorageResult from "./StorageResult";


const StorageSelect = ({warnings, strictMode, setStrictMode, currentBuild, setDrives}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState();
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(20)

  useEffect(() => {
    const tempTest = [...currentBuild.storage];
    currentBuild.storage.map((item) => {
      const tempAmount = item.amount
      delete item.amount;
      for (let i = 0; i < tempAmount; i++) {
        tempTest.push({
          ...item,
          localId:uuidv4(),
        })
      }
      return null;
    })
    setDrives(tempTest)
  },[])

  const apiCall = useCallback(() => {
    if(!strictMode) {
      return fetchCompatibleStorage(undefined, page, perPage);
    } else {
      return fetchCompatibleStorage(currentBuild.motherboard.idMotherboard, page, perPage);
    }
  }, [currentBuild.motherboard.idMotherboard, strictMode, page, perPage]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

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
              query &&               
              <StorageResult 
                filter={fetchCompatibleStorageByFilter}
                setProductInfo={setProductInfo}
                currentBuild={currentBuild}
                onClick={onClick}
                result={query}
                strictMode={strictMode}
              />
            }
            {(data.result.length === 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="/blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              !query && (
                <>
                  <ul className="productList">
                    {data.result.map((product) => (
                      <li key={product.idStorage}>
                        <BuilderProductCard
                          product={product}
                          setProductInfo={setProductInfo}
                          link={PossibleRoutes.Detail}
                          id={product.idStorage}
                        >
                          <p>
                            Manufacturer: {product.manufacturerName}<br/>
                            Capacity: {product.capacity}<br/>
                            Storage Type: {product.storageType}<br/>
                            {product.RPM > 0 ? 'Speed in RPM: ' + product.RPM+"'" :''}<br/>
                            <b className="price">MSRP Price: {product.price ? `€${product.price}` : 'Unknown'}</b>
                          </p>
                          <button type="button" onClick={() => onClick(product)}>Add</button>
                        </BuilderProductCard>
                      </li>
                    ))}
                  </ul>
                  <Pagination
                    page={page}
                    perPage={perPage}
                    pageAmount={data.pageAmount}
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
                  fetcher={fetchStorageByIdBuilder}
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

export default StorageSelect;
