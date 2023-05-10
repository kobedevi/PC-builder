import { useEffect } from 'react';

const Modal = ({ children, title, onDismiss }) => {
    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    window.onkeydown = function( event ) {
        if ( event.keyCode === 27 ) {
            onDismiss();
        }
    };

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
                            <div className='btnContainer'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" />
        </>
    );
};

export default Modal;