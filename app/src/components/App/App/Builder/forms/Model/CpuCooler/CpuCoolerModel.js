import { Text, useGLTF } from "@react-three/drei";
import React from "react";
import cpuCooler from "../assets/CpuCooler/cooler_base.glb";
import cpuFins from "../assets/CpuCooler/cooler_fins.glb";

const CpuCoolerModel = ({ currentBuild }) => {
  console.log(currentBuild)
  const { scene: base } = useGLTF(cpuCooler, true);
  const { scene: fins } = useGLTF(cpuFins, true);

  // NATIVE FIN SIZES
  // X: 148mm
  // Y: 79mm
  // 1 FIN = Z: 1.36mm!!!!!
  const width = currentBuild.cpucooler.width / 148;
  const depth = currentBuild.cpucooler.depth / 79;
  const height = currentBuild.cpucooler.height / 1.36;

  // NATIVE BASE SIZE
  // Z: 88mm
  const base_height = 88;
  const temp = Math.round(height - base_height);

  if (temp <= 0) {
    // Fallback if size doesn't make sense for the model
    return (
      <group>
        <mesh position={[0, 0.15, -0.09]} receiveShadow={true}>
          <React.Suspense fallback={null}>{/* TODO: MODEL */}</React.Suspense>
        </mesh>
      </group>
    );
  }
  return (
    <group
      scale={[0.5, 0.5, 0.5]}
      position={[0, -temp * (0.136 / 2) + 0.88, 0]}
    >
      <group name="base" position={[0, 0, 0]}>
        <primitive object={base} />
      </group>
      <group name="fins" position={[0, 1.62, 0]} scale={[width, 1, depth]}>
        {Array(temp)
          .fill(null)
          .map((value, index) => {
            const clone = fins.clone();
            return (
              <primitive
                key={index}
                object={clone}
                position={[0, index * 0.136, 0]}
              />
            );
          })}
      </group>
    </group>
  );
};

export default CpuCoolerModel;
