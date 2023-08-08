import BuilderProductCard from 'components/Design/BuilderProductCard'
import { useCallback } from 'react'
import useNoAuthFetch from "../../../../core/hooks/useNoAuthFetch";
import ErrorAlert from 'components/shared/ErrorAlert';
import Spinner from 'components/Design/Spinner';
import { fetchFeaturedBuilds } from 'core/modules/Builds/api';
import FeaturedProductCard from 'components/Design/FeaturedProductCard';
import { Link } from 'react-router-dom';
import { PossibleRoutes, route } from 'core/routing';

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
              <ul className="productList featuredList">
                {data.map((product) => {
                  return(
                  <Link to={route(PossibleRoutes.BuildDetail, {id: product.idBuild})}>
                    <li key={product.idBuild}>
                      <FeaturedProductCard
                        product={product}
                        id={product.idBuild}
                      >
                        CPU: {product.cpu_modelName}<br/>
                        GPU: {product?.gpu_modelName}<br/>
                        CASE: {product?.case_modelName}<br/>
                      </FeaturedProductCard>
                    </li>
                  </Link>
                )})}
              </ul>
            )
          }
        </div>
    </div>
  )
}

export default Featured