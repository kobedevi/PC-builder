import React from "react";
import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";

const CpuDetail = ({ cpu }) => {
  return (
    <>
      <Link to={route(PossibleRoutes.CpuEdit, { id: cpu.idProcessor })}>
        {cpu.modelName}
      </Link>
    </>
  );
};

export default CpuDetail;
