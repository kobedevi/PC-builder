import { Text, useGLTF } from "@react-three/drei";
import React from "react";
import { Case } from "./assets/CaseCube";

const Model = ({ pccase, scale=1, position=[0,0,0], rotation=[0,0,0] }) => {

  pccase = {
    ...pccase,
    width: pccase.width/100,
    depth: pccase.depth/100,
    height: pccase.height/100
  }
  return (
    <group name="manipulator" scale={scale} position={position} rotation={rotation}>
      <group name="Case" scale={.35}>
        <group name="base" rotation={[0, 0, 0]} scale={[pccase.width, pccase.height, pccase.depth]} position={[-pccase.width, pccase.height , pccase.depth * 2 -.7]}>
          <Case />
        </group>
      </group>
    </group>
  );
};

export default Model;
