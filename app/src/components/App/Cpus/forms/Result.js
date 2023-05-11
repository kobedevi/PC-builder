import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import {fetchFilteredCpus} from "../../../../core/modules/CPU/api"
import Alert from "components/Design/Alert";

const Result = ({result, deleter, updateChecker}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredCpus(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, updateChecker])

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
            <>
                <Alert color={"info"}>{products.message}</Alert>
            </>
        )
    }

    return (
        <>
        {
            products && (
                <ul className='movieList'>
                    { products.map((product) => (
                        <li key={product.idProcessor}>
                            <ProductCard deleter={deleter} product={product}/>
                        </li>
                    ))}
                </ul>
            )
        }
        </>
    )
}

export default Result;