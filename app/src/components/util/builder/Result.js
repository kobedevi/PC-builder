import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import { PossibleRoutes } from "core/routing";
import BuilderProductCard from "components/Design/BuilderProductCard";

const Result = ({result, filter}) => {

    const apiCall = useCallback(() => {
        return filter(result);
    }, [result, filter])

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
                <ul className='productList'>
                    { products.map((product) => (
                        <li key={product.idProcessor}>
                            <BuilderProductCard
                                product={product}
                                link={PossibleRoutes.Detail}
                                id={product.idProcessor}
                            >
                                Manufacturer: {product.manufacturerName}<br/>
                                Formfactor: {product.formfactor}<br/>
                            </BuilderProductCard>
                        </li>
                    ))}
                </ul>
            )
        }
        </>
    )
}

export default Result;