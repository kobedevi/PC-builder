import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useFetch from "core/hooks/useFetch";
import Spinner from "components/Design/Spinner";
import ProductCard from "components/Design/ProductCard";
import {fetchFilteredOriginalGpu} from "../../../../core/modules/Gpu/api"
import { PossibleRoutes } from "core/routing";

const ResultOriginalGpu = ({result, deleter}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredOriginalGpu(result);
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
                        <li key={product.idGpu}>
                            <ProductCard
                                deleter={deleter}
                                product={product}
                                id={product.idGpu}
                                link={PossibleRoutes.GpuDetail}
                            >
                                Manufacturer: {product.manufacturerName}<br/>
                                Vram: {product.vram} GB<br/>
                                <div>
                                    Displayport out: {product.displayport}<br/>
                                    HDMI out: {product.hdmi}<br/>
                                    VGA out: {product.vga}<br/>
                                    DVI out: {product.dvi}<br/>
                                </div>
                            </ProductCard>
                        </li>
                    ))}
                </ul>
            )
        }
        </>
    )
}

export default ResultOriginalGpu;