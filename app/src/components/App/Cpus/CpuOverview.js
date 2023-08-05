import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import DeleteCpu from "./Delete/DeleteCpu";
import ProductCard from "components/Design/ProductCard";
import SearchForm from "components/Design/SearchForm";
import Result from "./forms/Result";
import Pagination from "components/Design/Pagination";

const CpuOverview = () => {
  const [info, setInfo] = useState();
  const [deleteCpu, setDeleteCpu] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const apiCall = useCallback(() => {
    return fetchCpus(page, perPage);
  }, [page, perPage]);

  const {
    data: cpus,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  const onUpdate = () => {
    setDeleteCpu(null);
    setQuery(null);
    refresh();
  };

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

  const onSubmit = (query) => {
    setQuery(query.search)
}

  return (
    <>
      <h2>CPU Overview</h2>

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
        cpus && (
          <>

            {
              info && <Alert color="info">{info}</Alert>
            }

            <SearchForm
              onSubmit={onSubmit}
              setQuery={setQuery}
            />

            <Link to={PossibleRoutes.Create} className="btn btn-primary">
              Add CPU
            </Link>

            {
              query && <Result updateChecker={deleteCpu} deleter={setDeleteCpu} result={query}/>
            }

            {
              !query && (
                <>
                  <ul className="movieList">
                    {cpus.cpus.map((cpu) => (
                      <li key={cpu.idProcessor}>
                        <ProductCard
                          deleter={setDeleteCpu}
                          product={cpu}
                          link={PossibleRoutes.Detail}
                          id={cpu.idProcessor}
                        >
                          Manufacturer: {cpu.manufacturerName}<br/>
                          Base Clock: {cpu.clockSpeed}Ghz<br/>
                          Cores: {cpu.cores}<br/>
                          Socket: {cpu.socketType}
                        </ProductCard>
                      </li>
                    ))}
                  </ul>
                  <Pagination 
                    page={page}
                    perPage={perPage}
                    pageAmount={cpus.pageAmount}
                    perPageClick={handlePerPageClick}
                    onClick={handlePageClick}
                  />
                </>
              )
            }

            {
              deleteCpu && (
                <DeleteCpu
                  cpu={deleteCpu}
                  onUpdate={onUpdate}
                  onDismiss={() => setDeleteCpu(null)}
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

export default CpuOverview;
