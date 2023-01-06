import Button from "../Design/Button";
import { useAuth } from "./AuthContainer";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button onClick={logout} color="outline-light">
      Sign out
    </Button>
  );
};

export default LogoutButton;
