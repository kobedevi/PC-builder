import { useCallback } from "react";
import ErrorAlert from "components/shared/ErrorAlert";
import useNoAuthFetch from "../../../core/hooks/useNoAuthFetch";
import Spinner from "components/Design/Spinner";
import { PossibleRoutes } from "core/routing";
import BuilderProductCard from "components/Design/BuilderProductCard";

const RamResult = ({strictMode, result, setProductInfo, onClick, currentBuild, filter}) => {

    const apiCall = useCallback(() => {
        if(!strictMode) {
            return filter(undefined, currentBuild.motherboard.idRamType, result);
          } else {
            return filter(currentBuild.motherboard.memorySlots, currentBuild.motherboard.idRamType, result);
          }
    }, [strictMode, filter, currentBuild.motherboard.memorySlots, currentBuild.motherboard.idRamType, result])

    
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
                            const disabled = product.idRam === currentBuild.ram.idRam ? true : false;
                            return (
                                <li key={product.idRam}>
                                    <BuilderProductCard
                                        setProductInfo={setProductInfo}
                                        product={product}
                                        link={PossibleRoutes.Detail}
                                        id={product.idRam}
                                        >
                                       <p>
                                            Manufacturer: {product.manufacturerName}<br/>
                                            Ram type: {product.ramType}<br/>
                                            Amount of sticks: {product.stickAmount}<br/>
                                            Size per stick: {product.sizePerStick} GB<br/>
                                            <strong>Total</strong> size: {product.sizePerStick * product.stickAmount} GB<br/>
                                            Ram speed: {product.speed}MHz<br/>
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

export default RamResult;