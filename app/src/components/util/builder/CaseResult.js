import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import Spinner from "components/Design/Spinner";
import { PossibleRoutes } from "core/routing";
import BuilderProductCard from "components/Design/BuilderProductCard";

const CaseResult = ({dimensions, result, setProductInfo, onClick, currentBuild, filter}) => {

    const apiCall = useCallback(() => {
        return filter(dimensions.width, dimensions.height, dimensions.depth, result);
    }, [dimensions, filter, result])

    
    const {
        data: products,
        error,
        isLoading
    } = useNoAuthFetch(apiCall);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <ErrorAlert error={error} />
    }

    if (products.message) {
        return (
            <div className="blobContainer">
                <p>{products.message}</p>
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
            </div>
        )
    }

    return (
        <>
            {
                products && (
                    <ul className='productList'>
                        { products.map((product) => {
                            const disabled = product.idCase === currentBuild.motherboard.idCase ? true : false;
                            return (
                                <li key={product.idCase}>
                                    <BuilderProductCard
                                        setProductInfo={setProductInfo}
                                        product={product}
                                        link={PossibleRoutes.Detail}
                                        id={product.idCase}
                                        >
                                       <p>
                                            Manufacturer: {product.manufacturerName}<br/>
                                            Formfactor: {product.formfactor}<br/>
                                        </p>
                                        <button type="button" onClick={() => onClick(product)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
                                    </BuilderProductCard>
                                </li>
                            )}
                        )}
                    </ul>
                )
            }
        </>
    )
}

export default CaseResult;