import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import { fetchCompatiblePsu, fetchFilteredPsus, fetchPsuByIdBuilder } from "core/modules/Psu/api";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import Pagination from "components/Design/Pagination";

const PsuSelect = ({minWat, currentBuild, updateBuild, updateFields, idPsu, }) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const apiCall = useCallback(() => {
    return fetchCompatiblePsu(minWat, page, perPage);
  }, [minWat, page, perPage]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const handlePageClick = (page) => {
    setPage(page)
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage)
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
            {(data.results.length === 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              !query && (
                <>
                  <ul className="productList">
                    {data.results.map((product) => {
                      const disabled = product.idPsu === currentBuild.psu.idPsu ? true : false;
                      return(
                      <li key={product.idPsu}>
                        <BuilderProductCard
                          product={product}
                          setProductInfo={setProductInfo}
                          link={PossibleRoutes.Detail}
                          id={product.idPsu}
                        >
                          <p>
                          Manufacturer: {product.manufacturerName}<br/>
                          Modular: {product.modular? "Yes": "No"}<br/>
                          Wattage: {product.wattage}W
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
                  fetcher={fetchPsuByIdBuilder}
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

export default PsuSelect;
