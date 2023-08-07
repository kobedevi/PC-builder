import BuilderProductCard from 'components/Design/BuilderProductCard'
import { useCallback } from 'react'
import useNoAuthFetch from "../../../../core/hooks/useNoAuthFetch";
import ErrorAlert from 'components/shared/ErrorAlert';
import Spinner from 'components/Design/Spinner';
import { fetchFeaturedBuilds } from 'core/modules/Builds/api';

const Featured = () => {

  const apiCall = useCallback(() => {
    return fetchFeaturedBuilds();
  }, []);

  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  return (
    <div className='curvedContainer'>
        <div className='gridItem'>
          <h2>Featured builds</h2>
          <p>
            These are recently made computers with our tool that people have published and shared with the community.<br/>
            and here should come more text!
          </p>
          <button>View more</button>
        </div>
        <div className='gridItem'>
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
              <ul className="productList">
                {data.map((product) => {
                  return(
                  <li key={product.idBuild}>
                    {/* TODO: convert to alternative card and redirect to build detail page */}
                    <BuilderProductCard
                      product={product}
                      id={product.idBuild}
                    >
                      CPU: {product.cpu_modelName}<br/>
                      GPU: {product?.gpu_modelName}<br/>
                    </BuilderProductCard>
                  </li>
                )})}
              </ul>
            )
          }
        </div>
    </div>
  )
}

export default Featured