import { useCallback, useEffect } from 'react';

const Modal = ({ children, center=false, title, onDismiss }) => {

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
                className="modal fade show"
                style={{ display: 'block' }}
                id="staticBackdrop">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel">
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={onDismiss}
                            />
                        </div>
                        <div className="modal-body">
                            {center && (
                                <div style={{width:"100%"}} className={"btnContainer d-flex justify-content-center"}>
                                    {children}
                                </div>
                            )}
                            {!center && (
                                <div style={{width:"100%"}} className='btnContainer'>
                                    {children}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" />
        </>
    );
};

export default Modal;