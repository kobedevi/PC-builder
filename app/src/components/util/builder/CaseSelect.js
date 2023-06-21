import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import { fetchCompatibleCases, fetchFilteredCases } from "core/modules/Case/api";

// TODO: everything here
const CaseSelect = ({idCase, formfactor, width, height, depth, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchCompatibleCases(width,height, depth);
  }, [width,height, depth]);
  
  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (product) => {
    updateFields({
      idCase: product.idCase,
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
              query && <Result filter={fetchFilteredCases} result={query}/>
            }
            {(data.length === 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              !query && (
                <ul className="movieList">
                  {data.map((product) => (
                    <li key={product.idCase}>
                      <ProductCard
                        product={product}
                        link={PossibleRoutes.Detail}
                        id={product.idCase}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        Vram: {product.vram} GB<br/>
                        Clockspeed: {product.clockspeed} MHz<br/>
                        Watercooled: {product.watercooled ? 'Yes': 'No'}
                      </ProductCard>
                      <button type="button" onClick={() => onClick(product)}>Choose</button>
                    </li>
                  ))}
                </ul>
              )
            }
          </>
        )
      }
    </>
  );
};

export default CaseSelect;
