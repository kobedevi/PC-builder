import React, { useCallback, useState } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchOriginalGpus } from "../../../../core/modules/Gpu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "core/routing";
import ErrorAlert from "components/shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import ProductCard from "components/Design/ProductCard";
import DeleteOrginalGpu from "../Delete/DeleteOriginalGpu";
import ResultOriginalGpu from "../forms/ResultOriginalGpu";

const OriginalGpuOverview = () => {
  const [info, setInfo] = useState();
  const [deleteGpu, setDeleteGpu] = useState();
  const [query, setQuery] = useState('');

  const apiCall = useCallback(() => {
    return fetchOriginalGpus();
  }, []);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onUpdate = () => {
    setDeleteGpu(null);
    setQuery(null);
    refresh();
  };
  return (
    <>
      <h4>Original GPU:</h4>

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

      {data && (
          <>

          {
            info && <Alert color="info">{info}</Alert>
          }

          <SearchForm
            onSubmit={onSubmit}
            setQuery={setQuery}
          />

          {
            query && <ResultOriginalGpu updateChecker={deleteGpu} deleter={setDeleteGpu} result={query}/>
          }

          {
            !query && (
              <ul className="movieList">
                {data.map((product) => (
                  <li key={product.idGpu}>
                    <ProductCard
                      deleter={setDeleteGpu}
                      product={product}
                      img={false}
                      link={PossibleRoutes.GpuDetail}
                      id={product.idGpu}
                    >
                      Manufacturer: {product.manufacturerName}<br/>
                      Vram: {product.vram} GB<br/>
                      <div>
                        Displayport out: {product.displayport}<br/>
                        HDMI out: {product.hdmi}<br/>
                        VGA out: {product.vga}<br/>
                        DVI out: {product.dvi}<br/>
                      </div>
                    </ProductCard>
                  </li>
                ))}
              </ul>
            )
          }

          {
            deleteGpu && (
              <DeleteOrginalGpu
                gpu={deleteGpu}
                onUpdate={onUpdate}
                onDismiss={() => setDeleteGpu(null)}
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

export default OriginalGpuOverview;
