import React from "react";
import { OrbitControls } from "@react-three/drei";
import BasicLighting from "../../../../Design/Lighting/Studio";
import Model from "./Model";

const ModelContainer = ({ cpu }) => {
  return (
    <>
      <group name="Helpers">
        <OrbitControls enablePan={true} enableRotate={true} enableZoom={true} />
      </group>
      <group name="Lighting">
        <BasicLighting />
      </group>
      <group name="Components">
        <Model cpu={cpu} />
      </group>
    </>
  );
};

export default ModelContainer;
