import Button from "components/Design/Button";
import Modal from "components/shared/Modal";
import useAuthApi from "core/hooks/useAuthApi";
import { deleteUser } from "../../../../core/modules/Users/api";

const DeleteUser = ({setError, user, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deleteUser(user.idUsers))
        .then((data) => {
            onUpdate();
            setInfo(`User: '${data.userName}' was deleted.`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete User'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteUser;