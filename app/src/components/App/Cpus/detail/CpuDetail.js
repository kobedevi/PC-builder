import React from "react";
import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import ModelContainer from "./Model/ModelContainer";
import CpuDetailCard from "../../../Design/DetailCards/CpuDetailCard";

const CpuDetail = ({ cpu }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <CpuDetailCard cpu={cpu} />
        <Link to={route(PossibleRoutes.CpuEdit, { id: cpu.idProcessor })}>
          {cpu.modelName}
        </Link>
      </div>
      <div className="model">
        <Leva flat={true} oneLineLabels={true} />
        <Canvas linear={false} shadows={true}>
          <ModelContainer cpu={cpu} />
        </Canvas>
      </div>
    </div>
  );
};

export default CpuDetail;
