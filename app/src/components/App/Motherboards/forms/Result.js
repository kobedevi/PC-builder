import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import { PossibleRoutes } from "core/routing";
import { fetchFilteredMotherboards } from "core/modules/Motherboard/api";

const Result = ({result, deleter}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredMotherboards(result);
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
                        <li key={product.idMotherboard}>
                            <ProductCard
                                deleter={deleter}
                                product={product}
                                id={product.idMotherboard}
                                link={PossibleRoutes.Detail}
                            >
                                Manufacturer: {product.manufacturerName}<br/>
                                Formfactor: {product.formfactor}<br/>
                                SocketType: {product.socketType}<br/>
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