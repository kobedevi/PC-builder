import Button from "components/Design/Button";
import Modal from "components/shared/Modal";
import useAuthApi from "core/hooks/useAuthApi";
import { deleteRam } from "../../../../core/modules/Ram/api";

const DeleteRam = ({setError, ram, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deleteRam(ram.idRam))
        .then((data) => {
            onUpdate();
            setInfo(`Cpu: '${data.modelName}' was deleted.`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete Ram'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteRam;