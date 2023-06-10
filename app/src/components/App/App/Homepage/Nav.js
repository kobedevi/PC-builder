import { useAuth } from "components/Auth/AuthContainer";
import Button from "components/Design/Button";
import useAdmin from "core/hooks/useAdmin";
import { PossibleRoutes } from "core/routing";
import { Link } from "react-router-dom";

const Nav = () => {

  const user = useAuth();
  const admin = useAdmin();

  return (
    <nav>
        <ul>
            <li><Link to={PossibleRoutes.Builder}>Pc-builder</Link></li>
            {admin && <li><Link to={PossibleRoutes.Crud}>CRUD</Link></li>}
            {!user?.user &&<li> <Link to={PossibleRoutes.Login}>Login</Link></li>}
            {user?.user && <li> <Button onClick={user.logout} color="outline-light">Sign out</Button></li>}
        </ul>
    </nav>
  )
}

export default Nav