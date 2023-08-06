import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCases } from "../../../core/modules/Case/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "components/shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import ProductCard from "components/Design/ProductCard";
import Result from "./forms/Result";
import DeleteCase from "./Delete/DeleteCase";
import Pagination from "components/Design/Pagination";

const CaseOverview = () => {
  const [info, setInfo] = useState();
  const [deleteCase, setDeleteCase] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(20)

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage)
  }

  const handlePageClick = (page) => {
    setPage(page)
  }

  const apiCall = useCallback(() => {
    return fetchCases(page, perPage);
  }, [page, perPage]);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);
  
  const onUpdate = () => {
    setDeleteCase(null);
    setQuery(null);
    refresh();
  };

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  return (
    <>
      <h2>Case Overview</h2>

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
              Add Case
            </Link>

            {
              query && <Result updateChecker={deleteCase} deleter={setDeleteCase} result={query}/>
            }

            {
              !query && (
                <>
                  <ul className="movieList">
                    {data.results.map((c) => (
                      <li key={c.idCase}>
                        <ProductCard
                          deleter={setDeleteCase}
                          product={c}
                          link={PossibleRoutes.Detail}
                          id={c.idCase}
                          >
                          Manufacturer: {c.manufacturerName}<br/>
                          Formfactor: {c.formfactor}<br/>
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
              deleteCase && (
                <DeleteCase
                  product={deleteCase}
                  onUpdate={onUpdate}
                  onDismiss={() => setDeleteCase(null)}
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












export default CaseOverview;
