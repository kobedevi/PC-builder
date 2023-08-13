import { Text, useGLTF } from "@react-three/drei";
import psuCubeModel from "./assets/psu_cube.glb";

const Model = ({ psu }) => {
  const { scene: psuModel } = useGLTF(psuCubeModel, true);

  return (
    <group name="psu">
      <group name="base" position={[-psu.width/100, psu.height/100, -psu.depth/100]} rotation={[0, 0, 0]}>
        <primitive 
          scale={[psu.width/100, psu.height/100, psu.depth/100]}
          object={psuModel} 
        />
      </group>
      <group name="text" position={[psu.width/100, 0, -psu.depth/100 +.1]} rotation={[0,Math.PI/2,0]}>
        <Text
          // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          color={0xffffff}
          fontSize={0.3}
          anchorX={"right"}
          anchorY={"middle"}
        >
          {psu.wattage}W
        </Text>
      </group>
    </group>
  );
};

export default Model;
