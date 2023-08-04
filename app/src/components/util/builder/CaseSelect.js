import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import { fetchCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";
import { fetchCaseByIdBuilder, fetchCompatibleCases, fetchFilteredCases } from "core/modules/Case/api";
import BuilderProductCard from "components/Design/BuilderProductCard";
import InfoModal from "components/Design/InfoModal";

const CaseSelect = ({currentBuild, updateBuild, idCase, formfactor, width, height, depth, updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const [productInfo, setProductInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchCompatibleCases(width,height, depth);
  }, [width,height, depth]);
  
  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  const onClick = (product) => {
    updateBuild({
      case: product
    })
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
                <ul className="productList">
                  {data.map((product) => {
                    const disabled = product.idCase === currentBuild.case.idCase ? true : false;
                    return(
                    <li key={product.idCase}>
                      <BuilderProductCard
                        product={product}
                        setProductInfo={setProductInfo}
                        link={PossibleRoutes.Detail}
                        id={product.idCase}
                      >
                        Manufacturer: {product.manufacturerName}<br/>
                        Formfactor: {product.formfactor}<br/>
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
                  fetcher={fetchCaseByIdBuilder}
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

export default CaseSelect;
