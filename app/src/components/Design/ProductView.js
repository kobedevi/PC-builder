import Button from "components/Design/Button";
import Modal from "components/shared/Modal";

const ProductView = ({image, center=false, onDismiss}) => {
    
    return(
        <Modal className="d-inline-flex p-2" onDismiss={onDismiss} center={center}>
            <img src={image} alt="Large product view"/>
        </Modal>
)

}

export default ProductView;