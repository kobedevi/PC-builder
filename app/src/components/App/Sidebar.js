import { Link } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";

const items = [
  {
    label: "Cpu",
    route: PossibleRoutes.Cpus,
    icon: null,
  },
  {
    label: "Motherboard",
    route: PossibleRoutes.Motherboards,
    icon: null,
  },
  {
    label: "Case",
    route: PossibleRoutes.Cases,
    icon: null,
  },
];

const Sidebar = () => {
  return (
    <nav id="sidenav" className="sidenav">
      <div>
        <ul>
          {items.map((item) => (
            <Link className="nav-link" to={item.route}>
              <li key={item.route} className="nav-item">
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
