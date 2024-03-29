import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useAuthApi from "../../../core/hooks/useAuthApi";
import useFetch from "../../../core/hooks/useFetch";
import { fetchStorage } from "../../../core/modules/Storage/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import Result from "./forms/Result";
import ProductCard from "components/Design/ProductCard";
import DeleteStorage from "./Delete/DeleteStorage";
import Pagination from "components/Design/Pagination";

const StorageOverview = () => {
  const [info, setInfo] = useState();
  const [deleteStorage, setDeleteStorage] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(20)

  const apiCall = useCallback(() => {
    return fetchStorage(page,  perPage);
  }, [page, perPage]);

  const { 
    data, 
    error, 
    setError, 
    isLoading, 
    refresh 
  } = useFetch(apiCall);

  
  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }
  
  const onUpdate = () => {
    setDeleteStorage(null);
    setQuery(null);
    refresh();
  };

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  return (
    <>
      <h2>Storage Overview</h2>
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
              onSubmit={onSubmit}
              setQuery={setQuery}
            />

            <Link to={PossibleRoutes.Create} className="btn btn-primary">
              Add storage
            </Link>

            {
              query && <Result updateChecker={deleteStorage} deleter={setDeleteStorage} result={query}/>
            }

            {
              !query && (
                <>
                  <ul className="movieList">
                    {data.result.map((product) => (
                      <li key={product.idStorage}>
                        <ProductCard
                          deleter={setDeleteStorage}
                          product={product}
                          link={PossibleRoutes.Detail}
                          id={product.idStorage}
                        >
                          Manufacturer: {product.manufacturerName}<br/>
                          Capacity: {product.capacity}<br/>
                          Storage Type: {product.storageType}<br/>
                          {product.RPM > 0 ? 'Speed in RPM: ' + product.RPM :''}
                        </ProductCard>
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
              deleteStorage && (
                <DeleteStorage
                  storage={deleteStorage}
                  onUpdate={onUpdate}
                  onDismiss={() => setDeleteStorage(null)}
                  setError={setError}
                  setInfo={setInfo}
                />
              )
            }


          </>
        )
      }
    </>
  );
};

export default StorageOverview;
