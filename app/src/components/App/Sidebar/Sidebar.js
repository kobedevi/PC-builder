import { Link } from "react-router-dom";
import { PossibleRoutes } from "../../../core/routing";
import { useAuth } from "components/Auth/AuthContainer";
import { isSuperAdmin } from "core/modules/Auth/utils";
import { useSuperAdmin } from "core/hooks/useAdmin";


const items = [
  {
    label: "CPU",
    route: PossibleRoutes.Cpus,
    icon: null,
    superAdmin: false,
  },
  {
    label: "CPU cooler",
    route: PossibleRoutes.CpuCoolers,
    icon: null,
    superAdmin: false,
  },
  {
    label: "Motherboard",
    route: PossibleRoutes.Motherboards,
    icon: null,
    superAdmin: false,
  },
  {
    label: "Storage",
    route: PossibleRoutes.Storage,
    icon: null,
    superAdmin: false,
  },
  {
    label: "Case",
    route: PossibleRoutes.Cases,
    icon: null,
    superAdmin: false,
  },
  {
    label: "Ram",
    route: PossibleRoutes.Ram,
    icon: null,
    superAdmin: false,
  },
  {
    label: "GPU",
    route: PossibleRoutes.Gpus,
    icon: null,
    superAdmin: false,
  },
  {
    label: "PSU",
    route: PossibleRoutes.Psus,
    icon: null,
    superAdmin: false,
  },
  {
    label: "Users",
    route: PossibleRoutes.Users,
    icon: null,
    superAdmin: true,
  },
];

const Sidebar = () => {
  const isSuperAdmin = useSuperAdmin();

  return (
    <nav id="sidenav" className="sidenav">
      <div>
        <ul>
          {items.map((item, key) => {
            if(isSuperAdmin && item.superAdmin) {
              return (
                <li key={item.route} className="nav-item">
                  <Link key={key} className="nav-link" to={item.route}>
                    {item.label}
                  </Link>
                </li>
              )
            } if(!item.superAdmin) {
              return (
                <li key={item.route} className="nav-item">
                  <Link key={key} className="nav-link" to={item.route}>
                    {item.label}
                  </Link>
                </li>
              )
            }return null;
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
