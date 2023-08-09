import { useCallback, useState } from 'react'
import Nav from '../Homepage/Nav'
import { fetchBuildsOverview } from 'core/modules/Builds/api';
import useNoAuthFetch from "../../../../core/hooks/useNoAuthFetch";
import ErrorAlert from 'components/shared/ErrorAlert';
import Spinner from 'components/Design/Spinner';
import FeaturedProductCard from 'components/Design/FeaturedProductCard';
import { Link } from 'react-router-dom';
import { PossibleRoutes, route } from 'core/routing';
import Pagination from 'components/Design/Pagination';


const BuildsOverview = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

  const apiCall = useCallback(() => {
    return fetchBuildsOverview(page,perPage);
  }, [page,perPage]);

  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);
  

  return (
    <>
        <Nav/>
        <div className='container' style={{marginTop: "6rem"}}>
          <div className='curvedContainer' style={{gridTemplateColumns: "1fr"}}>
            <h3>Completed builds overview</h3>
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
                  <ul className="productList featuredList" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                    {data.results.map((product) => {
                      return(
                      <Link to={route(PossibleRoutes.BuildDetail, {id: product.idBuild})} key={product.idBuild}>
                        <li>
                          {/* TODO: convert to alternative card and redirect to build detail page */}
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
          </div>
        </div>
    </>
  )
}

export default BuildsOverview