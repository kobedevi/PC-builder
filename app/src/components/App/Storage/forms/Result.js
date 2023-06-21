import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import { PossibleRoutes } from "core/routing";
import { fetchFilteredStorage } from "core/modules/Storage/api";

const Result = ({result, deleter}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredStorage(result);
    }, [result, ])

    const {
        data: products,
        error,
        isLoading
    } = useFetch(apiCall);

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
                <ul className='movieList'>
                    { products.map((product) => (
                        <li key={product.idStorage}>
                            <ProductCard
                                deleter={deleter}
                                product={product}
                                id={product.idStorage}
                                link={PossibleRoutes.Detail}
                            >
                                Manufacturer: {product.manufacturerName}<br/>
                                Capacity: {product.capacity}<br/>
                                Storage Type: {product.storageType}<br/>
                                {product.RPM > 0 ? 'Speed in RPM: ' + product.RPM :''}
                            </ProductCard>
                        </li>
                    ))}
                </ul>
            )
        }
        </>
    )
}

export default Result;