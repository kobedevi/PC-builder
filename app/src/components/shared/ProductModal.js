import DetailCard from 'components/Design/DetailCard';
import Spinner from 'components/Design/Spinner';
import { useCallback, useEffect } from 'react';
import ErrorAlert from './ErrorAlert';

const ProductModal = ({ product=null, isLoading, error=null, children, center=false, title, onDismiss }) => {

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            onDismiss();
        }
    }, [onDismiss]);

    useEffect(() => {
        document.body.classList.add('modal-open');
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.body.classList.remove('modal-open');
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction, onDismiss]);

    return (
        <>
            <div
                className="modal fade show productModal"
                style={{ display: 'block' }}
                id="staticBackdrop">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {error && (
                            <>
                                <div className="modal-header errors">
                                    <ErrorAlert error={error}/>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={onDismiss}
                                    />
                                </div>
                                <div className="modal-body">
                                </div>
                            </>
                        )}
                        {isLoading && (
                            <>
                                <div className="modal-header">
                                    <Spinner/>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={onDismiss}
                                    />
                                </div>
                                <div className="modal-body">
                                </div>
                            </>
                        )}
                        {product && (
                            <>
                                <div className="modal-header modalContent">
                                    <h5
                                        className="modal-title"
                                        id="staticBackdropLabel">
                                        {product.modelName}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={onDismiss}
                                    />
                                </div>
                                <div className="modal-body modalContent">
                                    <DetailCard data={product}/>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" />
        </>
    );
};

export default ProductModal;