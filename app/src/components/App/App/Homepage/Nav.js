import { useAuth } from "components/Auth/AuthContainer";
import Button from "components/Design/Button";
import useAdmin from "core/hooks/useAdmin";
import { PossibleRoutes } from "core/routing";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import useNoAuthFetch from "../../../../core/hooks/useNoAuthFetch";
import { scrape } from "core/modules/Psu/api";


const Nav = () => {

  const user = useAuth();
  const admin = useAdmin();

  return (
    <nav className="mainNav">
        <ul>
            <div>
              <li className="logo"><Link to={PossibleRoutes.Home}>Home</Link></li>
            </div>
            <div>
              <li><Link to={PossibleRoutes.Builder}>Builder</Link></li>
              <li><Link to={PossibleRoutes.Builder}>Completed builds</Link></li>
              {admin && <li><Link to={PossibleRoutes.Crud}>CRUD</Link></li>}
            </div>
            <div>
              {!user?.user &&<li> <Link to={PossibleRoutes.Login}>Login</Link></li>}
              {user?.user && <li> <Button onClick={user.logout} color="outline-light">Sign out</Button></li>}
            </div>
        </ul>
    </nav>
  )
}

export default Nav