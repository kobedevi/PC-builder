import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import {fetchFilteredRam} from "../../../../core/modules/Ram/api"
import { PossibleRoutes } from "core/routing";

const Result = ({result, deleter}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredRam(result);
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
                        <li key={product.idRam}>
                            <ProductCard
                                deleter={deleter}
                                product={product}
                                id={product.idRam}
                                link={PossibleRoutes.Detail}
                            >
                                Manufacturer: {product.manufacturerName}<br/>
                                Ram type: {product.ramType}<br/>
                                Amount of sticks: {product.stickAmount}<br/>
                                Size per stick: {product.sizePerStick} GB<br/>
                                <strong>Total</strong> size: {product.sizePerStick * product.stickAmount} GB<br/>
                                Ram speed: {product.speed}MHz<br/>
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