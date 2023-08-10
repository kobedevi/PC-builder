import { useAuth } from "../../components/Auth/AuthContainer";
import { isAdmin, isSuperAdmin } from "../modules/Auth/utils";

const useAdmin = () => {
  const user = useAuth();
  if(!user) {
    return false
  } else {
      return isAdmin(user.user);
  }
};

const useSuperAdmin = () => {
  const user = useAuth();
  if(!user) {
    return false
  } else {
      return isSuperAdmin(user.user);
  }
};

export {
  useAdmin,
  useSuperAdmin
};
