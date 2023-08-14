import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import Spinner from "components/Design/Spinner";
import { PossibleRoutes } from "core/routing";
import BuilderProductCard from "components/Design/BuilderProductCard";

const GpuResult = ({result, setProductInfo, onClick, currentBuild, filter}) => {

    const apiCall = useCallback(() => {
        return filter(result);
    }, [filter, result])

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
                <img src="/blob.svg" alt="blobby blobby blobby!"/>
            </div>
        )
    }

    return (
        <>
            {
                products && (
                    <ul className='productList'>
                        { products.map((product) => {
                            const disabled = product.idGpuPartner === currentBuild.gpu.idGpuPartner ? true : false;
                            return (
                                <li key={product.idPartnerGpu}>
                                    <BuilderProductCard
                                        setProductInfo={setProductInfo}
                                        product={product}
                                        link={PossibleRoutes.Detail}
                                        id={product.idPartnerGpu}
                                        >
                                       <p>
                                            Manufacturer: {product.manufacturerName}<br/>
                                            Vram: {product.vram}GB<br/>
                                            Clockspeed: {product.clockspeed}MHz<br/>
                                            Watercooled: {product.watercooled ? 'Yes': 'No'}<br/>
                                            TDP: {product.wattage ? `${product.wattage}W` : 'Unknown'}<br/>
                                            <b className="price">MSRP Price: {product.price ? `€${product.price}` : 'Unknown'}</b>
                                        </p>
                                        <button type="button" onClick={() => onClick(product)} disabled={disabled}>{!disabled ? 'Add' : 'Added'}</button>
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

export default GpuResult;