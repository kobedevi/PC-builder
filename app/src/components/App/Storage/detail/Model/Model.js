import { Text, useGLTF } from "@react-three/drei";
import React from "react";
import ssd from "./assets/ssd.glb";

const Model = ({ storage }) => {
  const { scene: storageModel } = useGLTF(ssd, true);

  return (
    <group name="storage" scale={.25}>
      <primitive 
        object={storageModel} 
      />
    </group>
  );
};

export default Model;
