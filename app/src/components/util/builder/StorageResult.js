import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import Spinner from "components/Design/Spinner";
import { PossibleRoutes } from "core/routing";
import BuilderProductCard from "components/Design/BuilderProductCard";

const StorageResult = ({strictMode, result, setProductInfo, onClick, currentBuild, filter}) => {

    const apiCall = useCallback(() => {
        if(!strictMode) {
            return filter(undefined, result);
        } else {
            return filter(currentBuild.motherboard.idMotherboard, result);
        }
    }, [strictMode, filter, currentBuild.motherboard.idMotherboard, result])

    
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
                            return (
                                <li key={product.idStorage}>
                                    <BuilderProductCard
                                        setProductInfo={setProductInfo}
                                        product={product}
                                        link={PossibleRoutes.Detail}
                                        id={product.idStorage}
                                        >
                                       <p>
                                            Manufacturer: {product.manufacturerName}<br/>
                                            Capacity: {product.capacity}<br/>
                                            Storage Type: {product.storageType}<br/>
                                            {product.RPM > 0 ? 'Speed in RPM: ' + product.RPM+"'" :''}<br/>
                                            <b className="price">MSRP Price: {product.price ? `€${product.price}` : 'Unknown'}</b>
                                        </p>
                                        <button type="button" onClick={() => onClick(product)}>Add</button>
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

export default StorageResult;