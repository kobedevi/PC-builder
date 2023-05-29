import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import {fetchFilteredCases} from "../../../../core/modules/Case/api"
import { PossibleRoutes } from "core/routing";

const Result = ({result, deleter}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredCases(result);
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
                        <li key={product.idCase}>
                            <ProductCard
                                deleter={deleter}
                                product={product}
                                id={product.idCase}
                                link={PossibleRoutes.CaseDetail}
                            >
                                Manufacturer: {product.manufacturerName}<br/>
                                Formfactor: {product.formfactor}<br/>
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