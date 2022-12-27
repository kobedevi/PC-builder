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
  return <div id="app"></div>;
};

export default GeneralOverview;
