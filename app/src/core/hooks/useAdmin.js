import { useAuth } from "../../components/Auth/AuthContainer";
import isAdmin from "../modules/Auth/utils";

const useAdmin = () => {
  const user = useAuth();
  if(!user) {
    return false
  } else {
      return isAdmin(user.user);
  }
};

export default useAdmin;
