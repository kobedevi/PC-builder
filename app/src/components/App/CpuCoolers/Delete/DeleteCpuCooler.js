import Button from "components/Design/Button";
import Modal from "components/shared/Modal";
import useAuthApi from "core/hooks/useAuthApi";
import { deleteCpuCooler } from "core/modules/CPUCooler/api";

const DeleteCpuCooler = ({setError, cooler, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deleteCpuCooler(cooler.idCpuCooler))
        .then((data) => {
            onUpdate();
            setInfo(`CPU cooler: '${data.modelName}' was deleted.`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete CPU cooler'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteCpuCooler;