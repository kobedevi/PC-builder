import { Text, useGLTF } from "@react-three/drei";

import { Base } from "./assets/Base";
import { Fin } from "./assets/Fin";

const Model = ({ cooler, baseScale=1, finScale=1, scale=1, rotation=[0,0,0], position=[0,0,0] }) => {

  // Model modified from Fochdog on sketchfab: https://sketchfab.com/3d-models/cpu-cooler-672a0a74a98c452a862016bee99f3579

  // NATIVE FIN SIZES
  // X: 148mm
  // Y: 79mm
  // 1 FIN = Z: 1.36mm!!!!!
  const width = cooler.width / 100;
  const depth = cooler.depth / 100;
  const height = cooler.height / 100;

  const base_height = 37.84 / 100;
  const finAmount = Math.round((height - base_height) * 1.36 * 20)

  // NATIVE BASE SIZE
  // Z: 88mm
  // console.log(height)
  // const temp = Math.round(height - base_height);
  // console.log(temp)

  if (finAmount <= 0) {
    return (
      <group name="cooler" scale={1.75} position={[0, 0, 0]} >
      <mesh
        castShadow={true}
        receiveShadow={true}
      >
        <boxGeometry args={[width, height, depth]}/>
        <meshStandardMaterial metalness={1}/>
      </mesh>
    </group>
    );
  }
  return (
    <group name="manipulator" anchorZ={"right"} rotation={rotation} scale={scale} position={position}>
      <group name="base" scale={[.45,1,.45]} position={[0, 0, 0]}>
        <Base scale={baseScale}/>
      </group>
      <group name="finsManipulator" scale={finScale}>
        <group name="trueScale" scale={[.45,1,.85]}>
          <group name="fins" position={[0, .7 ,0]} scale={[width, .3, depth]}>
            {Array(finAmount)
              .fill(null)
              .map((value, index) => {
                return (
                  <group name="fin" key={index} position={[0, index * 0.136, 0]}>
                    <Fin/>  
                  </group>
                );
              })
            }
          </group>
        </group>
      </group>
    </group>
  );
};

export default Model;
