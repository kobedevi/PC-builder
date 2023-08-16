import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchPsus, scrape } from "../../../core/modules/Psu/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "components/shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import ProductCard from "components/Design/ProductCard";
import Result from "./forms/Result";
import DeletePsu from "./Delete/DeletePsu";
import Pagination from "components/Design/Pagination";
import { useAdmin } from "core/hooks/useAdmin";
import Button from "components/Design/Button";

const PsuOverview = () => {
  const [info, setInfo] = useState();
  const [deletePsu, setDeletePsu] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const isAdmin = useAdmin();

  const apiCall = useCallback(() => {
    return fetchPsus(page, perPage);
  }, [page, perPage]);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

  const onUpdate = () => {
    setDeletePsu(null);
    setQuery(null);
    refresh();
  };

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const handleScrape = () => {
    scrape();
  }


  return (
    <>
      <h2>Power supply Overview</h2>
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
              Add Power supply
            </Link>
            
            {/* {
              isAdmin && <Button onClick={() => handleScrape()} color="outline-light">Scrape-test</Button>
            } */}

            {
              query && <Result updateChecker={deletePsu} deleter={setDeletePsu} result={query}/>
            }

            {
              !query && (
                <>
                  <ul className="movieList">
                    {data.results.map((product) => (
                      <li key={product.idPsu}>
                        <ProductCard
                          deleter={setDeletePsu}
                          product={product}
                          id={product.idPsu}
                          link={PossibleRoutes.Detail}
                      >
                          Manufacturer: {product.manufacturerName}<br/>
                          Modular: {product.modular ? 'Yes': 'No'}<br/>
                          wattage: {product.wattage}W
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
            deletePsu && (
              <DeletePsu
                product={deletePsu}
                onUpdate={onUpdate}
                onDismiss={() => setDeletePsu(null)}
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

export default PsuOverview;
