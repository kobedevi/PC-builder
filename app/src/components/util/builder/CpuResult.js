import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import Spinner from "components/Design/Spinner";
import { PossibleRoutes } from "core/routing";
import BuilderProductCard from "components/Design/BuilderProductCard";

const CpuResult = ({result, setProductInfo, onClick, currentBuild, filter}) => {

    const apiCall = useCallback(() => {
        return filter(result);
    }, [result, filter])

    
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
                <img src="./blob.svg" alt="blobby blobby blobby!"/>
            </div>
        )
    }

    return (
        <>
            {
                products && (
                    <ul className='productList'>
                        { products.map((product) => {
                            const disabled = product.idProcessor === currentBuild.cpu.idProcessor ? true : false;
                            return (
                                <li key={product.idProcessor}>
                                    <BuilderProductCard
                                        setProductInfo={setProductInfo}
                                        product={product}
                                        link={PossibleRoutes.Detail}
                                        id={product.idProcessor}
                                        >
                                        <p>
                                            Manufacturer: {product.manufacturerName}<br/>
                                            TDP: {product.wattage ? `${product.wattage}W` : 'Unknown'}<br/>
                                            Base Clock: {product.clockSpeed}Ghz<br/>
                                            Cores: {product.cores}<br/>
                                            Socket: {product.socketType}<br/>
                                            <b className="price">MSRP Price: {product.price ? `€${product.price}`: 'Unknown'}</b>
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

export default CpuResult;