import React from "react";
import { Link } from "react-router-dom";
import { PossibleRoutes } from "../../../core/routing";

const items = [
  {
    label: "CPU",
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

const GeneralOverview = () => {
  return (
    <nav id="sidenav" className="sidenav">
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.route} className="nav-item">
              <Link className="nav-link" to={item.route}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default GeneralOverview;
