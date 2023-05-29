import Button from "components/Design/Button";
import Modal from "components/shared/Modal";
import useAuthApi from "core/hooks/useAuthApi";
import { deleteCase } from "../../../../core/modules/Case/api";

const DeleteCase = ({setError, product, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deleteCase(product.idCase))
        .then((data) => {
            onUpdate();
            setInfo(`Case: '${data.modelName}' was deleted.`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete Case'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteCase;