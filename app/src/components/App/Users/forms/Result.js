import { useCallback } from "react";
import useFetch from "../../../../core/hooks/useFetch";
import { fetchFilteredUsers } from "../../../../core/modules/Users/api";
import Alert from "../../../Design/Alert";
import Spinner from "../../../Design/Spinner";
import DeleteUser from "../Delete/DeleteUser";
import DeleteButton from "components/Design/DeleteButton";
import EditButton from "components/Design/EditButton";

const Result = ({result, setCurrentUser, deleteUser, setDeleteUser, authUser}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredUsers(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, deleteUser])

    const {
        data: users,
        error,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    if (isLoading) {
        return <Spinner />;
    }

    const handleUpdate = () => {
        setDeleteUser(null);
        refresh();
    }

    if (error) {
        return <Alert color="danger">{error.message}</Alert>;
    }
    
    if (users.message) {
        return (
            <div className="blobContainer">
                <p>{users.message}</p>
                <img src="../blob.svg" alt="blobby blobby blobby!"/>
            </div>
        )
    }

    return (
        <>
        {
            users && (
                <table className='mt-4'>
                    <thead>
                        <tr>    
                            <th></th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map((user) => {
                            if(user.email !== authUser?.user.email) {
                            return (<tr key={user.idUsers}>
                                <td>
                                    <DeleteButton deleter={() => setDeleteUser(user)}/>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.userName}</td>
                                <td>{user.role}</td>
                                <td>
                                    <EditButton editor={() => setCurrentUser(user)}/>
                                </td>
                            </tr>)
                            }
                            return;
                        })}
                    </tbody>
                </table>
            )
        }

        {
            deleteUser && (
                <DeleteUser
                    user={deleteUser}
                    onUpdate={handleUpdate}
                    onDismiss={() => setDeleteUser(null)}>
                </DeleteUser>
            )
        }
        </>
    )
}

export default Result;