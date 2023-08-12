import { useCallback, useState, useEffect } from "react";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import { fetchCompatibleGpus, fetchCompatibleGpusFilter } from "core/modules/Gpu/api";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import {fetchPartnerGpuByIdBuilder} from "../../../core/modules/Gpu/api"
import Pagination from "components/Design/Pagination";
import GpuResult from "./GpuResult";

const GpuSelect = ({currentBuild, updateBuild, depth, width, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState()
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const apiCall = useCallback(() => {
    return fetchCompatibleGpus(page, perPage);
  }, [page, perPage]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  useEffect(() => {
    updateFields({
      idGpu: currentBuild.gpu.idGpuPartner,
    })
    if(currentBuild.gpu.depth > depth) {
      updateFields({
        maxDepth: currentBuild.gpu.depth,
      })
    }
    if(currentBuild.gpu.width > width) {
      updateFields({
        maxWidth: currentBuild.gpu.width,
      })
    }
  }, [])

  const handlePageClick = (page) => {
    setPage(page)
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage)
  }

  const onClick = (gpu) => {
    updateBuild({
      gpu
    })
    updateFields({
      idGpu: gpu.idGpuPartner,
    })
    if(gpu.depth > depth) {
      updateFields({
        maxDepth: gpu.depth,
      })
    }
    if(gpu.width > width) {
      updateFields({
        maxWidth: gpu.width,
      })
    }
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
              query &&               
              <GpuResult 
                filter={fetchCompatibleGpusFilter}
                setProductInfo={setProductInfo}
                currentBuild={currentBuild}
                onClick={onClick}
                result={query}
              />
            }
            {(data.results.length === 0 || currentBuild.motherboard.pcieSlots <= 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="/blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              (!query && currentBuild.motherboard.pcieSlots > 0) && (
                <>
                  <ul className="productList">
                    {data.results.map((product) => {
                      const disabled = product.idGpuPartner === currentBuild.gpu.idGpuPartner ? true : false;
                      return (
                      <li key={product.idGpuPartner}>
                        <BuilderProductCard
                          subtitle={`Chipset: ${product.chipset}`}
                          product={product}
                          setProductInfo={setProductInfo}
                          link={PossibleRoutes.Detail}
                          id={product.idGpuPartner}
                        >
                          <p>
                          Manufacturer: {product.manufacturerName}<br/>
                          Vram: {product.vram}GB<br/>
                          Clockspeed: {product.clockspeed}MHz<br/>
                          Watercooled: {product.watercooled ? 'Yes': 'No'}<br/>
                          <b className="price">MSRP Price: {product.price ? `€${product.price}` : 'Unknown'}</b>
                          </p>
                          <button type="button" onClick={() => onClick(product)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
                        </BuilderProductCard>
                      </li>
                    )})}
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
              productInfo && (
                <InfoModal
                  onDismiss={() => setProductInfo(null)}
                  fetcher={fetchPartnerGpuByIdBuilder}
                  productInfo={productInfo}
                />
              )
            }

          </>
        )
      }
    </>
  );
};

export default GpuSelect;
