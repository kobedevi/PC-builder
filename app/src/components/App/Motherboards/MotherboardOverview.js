import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useAuthApi from "../../../core/hooks/useAuthApi";
import useFetch from "../../../core/hooks/useFetch";
import { fetchMotherboards } from "../../../core/modules/Motherboard/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import Result from "./forms/Result";
import ProductCard from "components/Design/ProductCard";
import DeleteMotherboard from "./Delete/DeleteMotherboard";

const MotherboardOverview = () => {
  const [info, setInfo] = useState();
  const [deleteMotherboard, setDeleteMotherboard] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchMotherboards();
  }, []);

  const { 
    data, 
    error, 
    setError, 
    isLoading, 
    refresh 
  } = useFetch(apiCall);

  
  const onUpdate = () => {
    setDeleteMotherboard(null);
    setQuery(null);
    refresh();
  };

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  return (
    <>
      <h2>Motherboard Overview</h2>
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
              Add Motherboard
            </Link>

            {
              query && <Result updateChecker={deleteMotherboard} deleter={setDeleteMotherboard} result={query}/>
            }

            {
              !query && (
                <ul className="movieList">
                  {data.map((mb) => (
                    <li key={mb.idMotherboard}>
                      <ProductCard
                        deleter={setDeleteMotherboard}
                        product={mb}
                        link={PossibleRoutes.Detail}
                        id={mb.idMotherboard}
                      >
                        Manufacturer: {mb.manufacturerName}<br/>
                        Formfactor: {mb.formfactor}<br/>
                        SocketType: {mb.socketType}<br/>
                      </ProductCard>
                    </li>
                  ))}
                </ul>
              )
            }

            {
              deleteMotherboard && (
                <DeleteMotherboard
                  motherboard={deleteMotherboard}
                  onUpdate={onUpdate}
                  onDismiss={() => setDeleteMotherboard(null)}
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

export default MotherboardOverview;
