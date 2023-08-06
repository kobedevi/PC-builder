import React, { useCallback, useState } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchOriginalGpus } from "../../../../core/modules/Gpu/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import { PossibleRoutes, route } from "core/routing";
import ErrorAlert from "components/shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import DeleteOrginalGpu from "../Delete/DeleteOriginalGpu";
import ResultOriginalGpu from "../forms/ResultOriginalGpu";
import Pagination from "components/Design/Pagination";

const OriginalGpuOverview = ({query, setQuery}) => {
  const [info, setInfo] = useState();
  const [deleteGpu, setDeleteGpu] = useState();
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(20)

  const apiCall = useCallback(() => {
    return fetchOriginalGpus(page, perPage);
  }, [page, perPage]);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

  const onUpdate = () => {
    setDeleteGpu(null);
    setQuery(null);
    refresh();
  };

  return (
    <>
      <h4>Chipset:</h4>

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

          {
            query && <ResultOriginalGpu updateChecker={deleteGpu} deleter={setDeleteGpu} result={query}/>
          }

          {
            !query && (
              <>
                <ul className="movieList">
                  {data.results.map((product) => (
                    <li key={product.idGpu}>
                      <ProductCard
                        deleter={setDeleteGpu}
                        product={product}
                        img={false}
                        link={PossibleRoutes.Detail}
                        id={product.idGpu}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        Vram: {product.vram} GB<br/>
                        <span>
                          Displayport out: {product.displayport}<br/>
                          HDMI out: {product.hdmi}<br/>
                          VGA out: {product.vga}<br/>
                          DVI out: {product.dvi}<br/>
                        </span>
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
