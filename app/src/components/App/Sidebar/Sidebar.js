import { Link } from "react-router-dom";
import { PossibleRoutes } from "../../../core/routing";

const items = [
  // {
  //   label: "Home",
  //   route: PossibleRoutes.HomeParent,
  //   icon: null,
  // },
  {
    label: "CPU",
    route: PossibleRoutes.Cpus,
    icon: null,
  },
  {
    label: "CPU cooler",
    route: PossibleRoutes.CpuCoolers,
    icon: null,
  },
  {
    label: "Motherboard",
    route: PossibleRoutes.Motherboards,
    icon: null,
  },
  {
    label: "Storage",
    route: PossibleRoutes.Storage,
    icon: null,
  },
  {
    label: "Case",
    route: PossibleRoutes.Cases,
    icon: null,
  },
  {
    label: "Ram",
    route: PossibleRoutes.Ram,
    icon: null,
  },
  {
    label: "GPU",
    route: PossibleRoutes.Gpus,
    icon: null,
  },
  {
    label: "PSU",
    route: PossibleRoutes.Psus,
    icon: null,
  },
  {
    label: "Users",
    route: PossibleRoutes.Users,
    icon: null,
  },
];

const Sidebar = () => {
  return (
    <nav id="sidenav" className="sidenav">
      <div>
        <ul>
          {items.map((item, key) => (
            <li key={item.route} className="nav-item">
              <Link key={key} className="nav-link" to={item.route}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
