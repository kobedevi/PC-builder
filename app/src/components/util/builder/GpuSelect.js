import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import { fetchCompatibleGpus, fetchFilteredPartnerGpu } from "core/modules/Gpu/api";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";
import {fetchPartnerGpuByIdBuilder} from "../../../core/modules/Gpu/api"

const GpuSelect = ({currentBuild, updateBuild, idGpu, pcieSlots, depth, width, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState()

  const apiCall = useCallback(() => {
    return fetchCompatibleGpus();
  }, []);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
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
              query && <Result filter={fetchFilteredPartnerGpu} result={query}/>
            }
            {(data.length === 0 || pcieSlots <= 0) && (
              <div className="blobContainer">
                <p style={{color: "black"}}>No compatible products found</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
              </div>
            )}
            {
              (!query && pcieSlots > 0) && (
                <ul className="productList">
                  {data.map((product) => {
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
                        Manufacturer: {product.manufacturerName}<br/>
                        Vram: {product.vram}GB<br/>
                        Clockspeed: {product.clockspeed}MHz<br/>
                        Watercooled: {product.watercooled ? 'Yes': 'No'}
                        <button type="button" onClick={() => onClick(product)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
                      </BuilderProductCard>
                    </li>
                  )})}
                </ul>
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
