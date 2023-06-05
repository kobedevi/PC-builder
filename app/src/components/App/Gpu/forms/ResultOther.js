import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import {fetchFilteredPartnerGpu} from "../../../../core/modules/Gpu/api"
import { PossibleRoutes } from "core/routing";

const Result = ({result, deleter}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredPartnerGpu(result);
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
                        <li key={product.id}>
                            <ProductCard
                                subtitle={`Chipset: ${product.ogCard}`}
                                deleter={deleter}
                                product={product}
                                link={PossibleRoutes.GpuPartnerDetail}
                                id={product.idGpuPartner}
                                >
                                Manufacturer: {product.manufacturerName}<br/>
                                Vram: {product.vram} GB<br/>
                                Clockspeed: {product.clockspeed} MHz<br/>
                                Watercooled: {product.watercooled ? 'Yes': 'No'}
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