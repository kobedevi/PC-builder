import { useAuth } from "../../components/Auth/AuthContainer";
import { isSuperAdmin } from "../modules/Auth/utils";

const useSuperAdmin = () => {
    const {user} = useAuth();
    return isSuperAdmin(user);
}

export default useSuperAdmin;