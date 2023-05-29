import Button from "components/Design/Button";
import Modal from "components/shared/Modal";
import useAuthApi from "core/hooks/useAuthApi";
import { deleteRam } from "../../../../core/modules/Ram/api";

const DeleteOrginalGpu = ({setError, gpu, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deleteRam(gpu.idGpu))
        .then((data) => {
            onUpdate();
            setInfo(`GPU: '${data.modelName}' was deleted.`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete Original GPU... DOES NOT WORK ATM'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteOrginalGpu;