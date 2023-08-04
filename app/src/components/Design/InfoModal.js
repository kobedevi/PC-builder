import { useCallback } from 'react'
import useNoAuthFetch from "../../core/hooks/useNoAuthFetch";
import { fetchCpuByIdBuilder } from 'core/modules/CPU/api';
import ProductModal from 'components/shared/ProductModal';


const InfoModal = ({onDismiss, productInfo, fetcher}) => {

    const apiCall = useCallback(() => {
        return fetcher(productInfo);
    }, [productInfo, fetcher]);

    const {
        data,
        error,
        setError,
        isLoading,
        refresh,
    } = useNoAuthFetch(apiCall);
    console.log(data);

    return(
        <ProductModal
            title={'Delete Ram'}
            center={false}
            onDismiss={onDismiss}
            product={data}
            error={error}
            isLoading={isLoading}
        >
        </ProductModal>
    )
}

export default InfoModal