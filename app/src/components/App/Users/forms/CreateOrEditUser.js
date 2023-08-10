import Modal from "components/shared/Modal";
import useAuthApi from "core/hooks/useAuthApi";
import { useState } from "react";
import UserForm from "./UserForm";
import ErrorAlert from "components/shared/ErrorAlert";
import { createUser, updateUser } from "core/modules/Users/api";

const CreateOrEditUser = ({user, onUpdate, onDismiss }) => {
    const withAuth = useAuthApi();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    // const admin = useAdmin();

    const isNew = !user.idUsers;

    const handleSubmit = (data) => {
        setIsLoading(true);
        withAuth(
            isNew
                ? createUser(data)
                : updateUser(data)
        )
            .then((data) => {
                // let parent know data is updated
                onUpdate(data);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    };

    return (
        <Modal
            title={isNew ? 'Create user' : 'Update user'}
            onDismiss={onDismiss}>
            <ErrorAlert error={error} />

            <UserForm
                isNew={isNew}
                onSubmit={handleSubmit}
                initialData={user}
                disabled={isLoading}
            />
        </Modal>
    );
};

export default CreateOrEditUser;