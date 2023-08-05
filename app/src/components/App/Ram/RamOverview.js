import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchRam } from "../../../core/modules/Ram/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "components/shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import ProductCard from "components/Design/ProductCard";
import Result from "./forms/Result";
import DeleteRam from "./Delete/DeleteRam";
import Pagination from "components/Design/Pagination";

const RamOverview = () => {
  const [info, setInfo] = useState();
  const [deleteRam, setDeleteRam] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

  const apiCall = useCallback(() => {
    return fetchRam(page, perPage);
  }, [page, perPage]);
  
  const onSubmit = (query) => {
    setQuery(query.search)
  }
  
  const { data: ram, error, setError, isLoading, refresh } = useFetch(apiCall);
  
  const onUpdate = () => {
    setDeleteRam(null);
    setQuery(null);
    refresh();
  };

  return (
    <>
      <h2>Ram Overview</h2>

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

      {ram && (
          <>

          {
            info && <Alert color="info">{info}</Alert>
          }

          <SearchForm
            onSubmit={onSubmit}
            setQuery={setQuery}
          />

          <Link to={PossibleRoutes.Create} className="btn btn-primary">
            Add Ram
          </Link>

          {
            query && <Result updateChecker={deleteRam} deleter={setDeleteRam} result={query}/>
          }

          {
            !query && (
              <>
              <ul className="movieList">
                {ram.result.map((product) => (
                  <li key={product.idRam}>
                    <ProductCard
                      deleter={setDeleteRam}
                      product={product}
                      link={PossibleRoutes.Detail}
                      id={product.idRam}
                    >
                      Manufacturer: {product.manufacturerName}<br/>
                      Ram type: {product.ramType}<br/>
                      Amount of sticks: {product.stickAmount}<br/>
                      Size per stick: {product.sizePerStick} GB<br/>
                      <strong>Total</strong> size: {product.sizePerStick * product.stickAmount} GB<br/>
                      Ram speed: {product.speed}MHz<br/>
                    </ProductCard>
                  </li>
                ))}
              </ul>
              <Pagination
                page={page}
                perPage={perPage}
                pageAmount={ram.pageAmount}
                perPageClick={handlePerPageClick}
                onClick={handlePageClick}
              />
              </>
            )
          }

          {
            deleteRam && (
              <DeleteRam
                ram={deleteRam}
                onUpdate={onUpdate}
                onDismiss={() => setDeleteRam(null)}
                setError={setError}
                setInfo={setInfo}
              />
            )
          }

          </>

      )}
    </>
  );
};

export default RamOverview;
