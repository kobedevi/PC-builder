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
            {!user?.user &&<li> <Link to={PossibleRoutes.Login}>Login</Link></li>}
            {user?.user && <li> <Button onClick={user.logout} color="outline-light">Sign out</Button></li>}
            {admin && <li><Link to={PossibleRoutes.Crud}>CRUD</Link></li>}
        </ul>
    </nav>
  )
}

export default Nav