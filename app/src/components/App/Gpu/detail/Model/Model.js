import { Text, useGLTF } from "@react-three/drei";
import React from "react";
import cpuModel from "./assets/cpu.glb";

const Model = ({ gpu }) => {
  const { scene: cpuScene } = useGLTF(cpuModel, true);

  return (
    <group name="cpu">
      <group name="base" position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={cpuScene} />
      </group>
      <group name="info">
        <mesh position={[0, 0.15, -0.09]} receiveShadow={true}>
          <React.Suspense fallback={null}>{/* TODO: MODEL */}</React.Suspense>
        </mesh>
      </group>
    </group>
  );
};

export default Model;
