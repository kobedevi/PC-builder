import { Text, useGLTF } from "@react-three/drei";

import { Base } from "./assets/Base";
import { Fin } from "./assets/Fin";

const Model = ({ cooler }) => {

  // Model modified from Fochdog on sketchfab: https://sketchfab.com/3d-models/cpu-cooler-672a0a74a98c452a862016bee99f3579

  // NATIVE FIN SIZES
  // X: 148mm
  // Y: 79mm
  // 1 FIN = Z: 1.36mm!!!!!
  const width = cooler.width / 148;
  const depth = cooler.depth / 79;
  const height = cooler.height / 1.36;

  // NATIVE BASE SIZE
  // Z: 88mm
  const base_height = 88;
  const temp = Math.round(height - base_height);

  if (temp <= 0) {
    return <Text fontSize={0.2}>Can't render model because of the sizes</Text>;
  }
  return (
    <group
      scale={[0.5, 0.5, 0.5]}
      position={[0, -temp * (0.136 / 2) + 0.88, 0]}
    >
      <group name="base" position={[0, 0, 0]}>
        <Base/>
      </group>
      <group name="fins" position={[0, 1.62, 0]} scale={[width, 1, depth]}>
        {Array(temp)
          .fill(null)
          .map((value, index) => {
            return (
              <group name="fin" key={index} position={[0, index * 0.136, 0]}>
                <Fin/>  
              </group>
            );
          })}
      </group>
    </group>
  );
};

export { Model };
