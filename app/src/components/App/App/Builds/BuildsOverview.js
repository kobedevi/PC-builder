import { useCallback, useState } from 'react'
import Nav from '../Homepage/Nav'
import useNoAuthFetch from "../../../../core/hooks/useNoAuthFetch";
import ErrorAlert from 'components/shared/ErrorAlert';
import Spinner from 'components/Design/Spinner';
import FeaturedProductCard from 'components/Design/FeaturedProductCard';
import { Link } from 'react-router-dom';
import { PossibleRoutes, route } from 'core/routing';
import Pagination from 'components/Design/Pagination';
import UserNameWithIcon from 'components/Design/UserNameWithIcon';


const BuildsOverview = ({fetcher, title, id=null, setUserName=null}) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const handlePageClick = (page) => {
    setPage(page);
  }

  const handlePerPageClick = (perPage) => {
    setPerPage(perPage);
  }

  const apiCall = useCallback(() => {
    if(id) {
      return fetcher(id, page,perPage);
    }
    return fetcher(page,perPage);
  }, [id, fetcher, page,perPage]);

  const { data, error, setError, isLoading, refresh } = useNoAuthFetch(apiCall);

  if(data?.results && setUserName) {
    setUserName(data?.userName ? data.userName : 'Unknown');
  }

  return (
    <>  
        <header>
          <Nav/>
        </header>

        <div className='container' style={{marginTop: "6rem"}}>
          <div className='curvedContainer' style={{gridTemplateColumns: "1fr"}}>
            <h2>{title}</h2>
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
              data?.results.length === 0 && (
                <div className="blobContainer">
                    <p>{'No builds'}</p>
                    <img src="/blob.svg" alt="blobby blobby blobby!"/>
                </div>
              )
            }
            
            {
              data && (
                <>
                  <ul className="productList featuredList" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                    {data.results.map((product) => {
                      return(
                      <Link to={route(PossibleRoutes.BuildDetail, {id: product.idBuild})} key={product.idBuild}>
                        <li>
                          {/* TODO: convert to alternative card and redirect to build detail page */}
                          <FeaturedProductCard
                            product={product}
                            id={product.idBuild}
                          >
                            {product.idUser && (
                              <Link to={route(PossibleRoutes.UserBuilds, {id: product.idUser})}>
                                <UserNameWithIcon userName={product.userName}/>
                              </Link>
                            )}
                            {!product.idUser && (
                              <UserNameWithIcon userName={product.userName}/>
                            )}
                            CPU: {product.cpu_modelName}<br/>
                            GPU: {product?.gpu_modelName}<br/>
                            CASE: {product?.case_modelName}<br/>
                            <b className="price">Total Price: {product.totalPrice ? `€${product.totalPrice}` : 'Unknown'}</b>
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