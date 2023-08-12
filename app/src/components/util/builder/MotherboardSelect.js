import { useCallback, useState, useEffect } from "react";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import { fetchCompatibleMotherboard, fetchCompatibleFilteredMotherboards, fetchMotherboardByIdBuilder } from "core/modules/Motherboard/api";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import Pagination from "components/Design/Pagination";
import MotherboardResult from "./MotherboardResult";

const MotherboardSelect = ({currentBuild, updateBuild, idMotherboard, idCpu, width, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const apiCall = useCallback(() => {
    return fetchCompatibleMotherboard(idCpu, page, perPage);
  }, [idCpu, page, perPage]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  useEffect(() => {
    updateFields({
      maxWidth: currentBuild.motherboard.width || 0, 
      maxHeight: currentBuild.motherboard.height || 0
    })
    return () => {
    }
  }, [])

  const onClick = (product) => {
    updateBuild({
      motherboard: product
    })
    updateFields({
      maxWidth: product.width,
      maxHeight: product.height
    })
  }

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
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
              query && 
              <MotherboardResult 
                filter={fetchCompatibleFilteredMotherboards}
                setProductInfo={setProductInfo}
                currentBuild={currentBuild}
                onClick={onClick}
                result={query}
              />
            }
            {(data.result.length === 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              !query && (
                <>
                  <ul className="productList">
                    {data.result.map((product) => {
                      const disabled = product.idMotherboard === currentBuild.motherboard.idMotherboard ? true : false;
                      return(
                      <li key={product.idMotherboard}>
                        <BuilderProductCard
                          setProductInfo={setProductInfo}
                          product={product}
                          link={PossibleRoutes.Detail}
                          id={product.idMotherboard}
                        >
                          <p>
                          Manufacturer: {product.manufacturerName}<br/>
                          Formfactor: {product.formfactor}<br/>
                          SocketType: {product.socketType}<br/>
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
                  fetcher={fetchMotherboardByIdBuilder}
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

export default MotherboardSelect;
