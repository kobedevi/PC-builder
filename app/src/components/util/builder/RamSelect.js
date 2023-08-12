import { useCallback, useState } from "react";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import { fetchCompatibleRam, fetchCompatibleRamFilter, fetchRamByIdBuilder } from "core/modules/Ram/api";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import Pagination from "components/Design/Pagination";
import RamResult from "./RamResult";

const RamSelect = ({strictMode, setStrictMode, currentBuild, updateBuild, idRamType, memorySlots}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

  const apiCall = useCallback(() => {
    if(!strictMode) {
      return fetchCompatibleRam(undefined, idRamType, page, perPage);
    } else {
      return fetchCompatibleRam(memorySlots, idRamType, page, perPage);
    }
  }, [memorySlots, idRamType, strictMode, page, perPage]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (product) => {
    updateBuild({
      ram: product
    })
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
        currentBuild.motherboard.memorySlots < currentBuild.ram.stickAmount && <Alert color="warning">You don't have enough memory slots available for all the selected ram</Alert>
      }

      <div className="custom-control custom-checkbox text">
        <input type="checkbox" id="strictMode" name="strictMode" className="custom-control-input" onChange={handleStrict} checked={strictMode}/>
        <label className="custom-control-label" htmlFor="strictMode" style={{marginLeft: ".5rem"}}>Strict mode<span style={{color: "#C665EA"}}>*</span></label>
        <p style={{opacity:.5, fontSize: "1rem"}}>You will see all compatible products, but for some you might not have enough connections</p>
      </div>

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
              query &&
              <RamResult 
                filter={fetchCompatibleRamFilter}
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
                    {data.result.map((product) => {
                      const disabled = product.idRam === currentBuild.ram.idRam ? true : false;
                      return(
                      <li key={product.idRam}>
                        <BuilderProductCard
                          product={product}
                          setProductInfo={setProductInfo}
                          link={PossibleRoutes.Detail}
                          id={product.idRam}
                        >
                          <p>
                          Manufacturer: {product.manufacturerName}<br/>
                          Ram type: {product.ramType}<br/>
                          Amount of sticks: {product.stickAmount}<br/>
                          Size per stick: {product.sizePerStick} GB<br/>
                          <strong>Total</strong> size: {product.sizePerStick * product.stickAmount} GB<br/>
                          Ram speed: {product.speed}MHz<br/>
                          <b className="price">MSRP Price: {product.price ? `€${product.price}` : 'Unknown'}</b>
                          </p>
                          <button type="button" onClick={() => onClick(product)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
                        </BuilderProductCard>
                      </li>
                    )})}
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
                  fetcher={fetchRamByIdBuilder}
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

export default RamSelect;
