import React from "react";
import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { GroupProps } from "@react-three/fiber";
import CpuCoolerDetailCard from "../../../Design/DetailCards/CpuCoolerDetailCard";
import Layout from "../../../Design/Models/Layout";
import { Model } from "./Model/Model";

const CpuCoolerDetail = ({ cooler }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <CpuCoolerDetailCard cooler={cooler} />
        {/* <Link to={route(PossibleRoutes.CpuEdit, { id: cooler.idCpuCooler })}>
          {cooler.modelName}
        </Link> */}
      </div>
      <div className="model">
        <Layout>
          <Model cooler={cooler} />
        </Layout>
      </div>
    </div>
  );
};

export default CpuCoolerDetail;
