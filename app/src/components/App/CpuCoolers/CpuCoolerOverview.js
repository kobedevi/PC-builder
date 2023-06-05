import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpuCoolers } from "../../../core/modules/CPUCooler/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "components/shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import DeleteCpuCooler from "./Delete/DeleteCpuCooler";
import SearchForm from "components/Design/SearchForm";
import Result from "./forms/Result";

const CpuCoolerOverview = () => {
  const [info, setInfo] = useState();
  const [deleteCooler, setDeleteCooler] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchCpuCoolers();
  }, []);

  const {
    data: cpuCoolers,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  const onUpdate = () => {
    setDeleteCooler(null);
    setQuery(null);
    refresh();
  };

  
  const onSubmit = (query) => {
    setQuery(query.search)
  }

  return (
    <>
      <h2>CPU cooler Overview</h2>
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
        cpuCoolers && (
          <>

            {
              info && <Alert color="info">{info}</Alert>
            }

            <SearchForm
              onSubmit={onSubmit}
              setQuery={setQuery}
            />

            <Link to={PossibleRoutes.Create} className="btn btn-primary">
              Add CPU cooler
            </Link>

            {
              query && <Result updateChecker={deleteCooler} deleter={setDeleteCooler} result={query}/>
            }

            {
              !query && (
                <ul className="movieList">
                  {cpuCoolers.map((cc) => (
                    <li key={cc.idCpuCooler}>
                      <ProductCard
                        deleter={setDeleteCooler}
                        product={cc}
                        link={PossibleRoutes.Detail}
                        id={cc.idCpuCooler}
                      >
                        Manufacturer: {cc.manufacturerName}<br/>
                        compatible sockets: {cc.socketType.join(', ')}<br/>
                      </ProductCard>
                    </li>
                  ))}
                </ul>
              )
            }

            {
              deleteCooler && (
                <DeleteCpuCooler
                  cooler={deleteCooler}
                  onUpdate={onUpdate}
                  onDismiss={() => setDeleteCooler(null)}
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

export default CpuCoolerOverview;
