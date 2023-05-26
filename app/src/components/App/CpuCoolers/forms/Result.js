import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import {fetchFilteredCpuCoolers} from "../../../../core/modules/CPUCooler/api"
import Alert from "components/Design/Alert";
import { PossibleRoutes } from "core/routing";

const Result = ({result, deleter}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredCpuCoolers(result);
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
                        <li key={product.idCpuCooler}>
                            <ProductCard
                                deleter={deleter}
                                product={product}
                                id={product.idCpuCooler}
                                link={PossibleRoutes.CpuCoolerDetail}
                            >
                                Manufacturer: {product.manufacturerName}<br/>
                                compatible sockets: {product.socketType.join(', ')}<br/>
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