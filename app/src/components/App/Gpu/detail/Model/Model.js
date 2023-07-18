import { Text, Text3D, useGLTF } from "@react-three/drei";
import React from "react";
import { Gpu } from "./assets/Gpu";

const Model = ({ gpu, position=[0,0,0], rotation=[0,0,0], scale=1 }) => {

  const offset = gpu.width/1000 * 2
  gpu = {
    ...gpu,
    width: gpu.width/100,
    depth: gpu.depth/100,
    height: gpu.height/100
  }

  return (
    <group name="manipulator" scale={scale} position={position} rotation={rotation} >
      <group name="Gpu" anchorX={"left"} anchorY={"center"} position={[-gpu.width , gpu.depth ,0]}>
        <group name="text" position={[offset, -gpu.depth / 2 -.225 , 0]}>
          <Text
            // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            color={0xffffff}
            fontSize={0.1}
            anchorX={"left"}
            anchorY={"middle"}
          >
            {gpu.manufacturerName}
          </Text>
          <Text
            position={[0,-.2,0]}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            color={0xffffff}
            fontSize={0.14}
            anchorX={"left"}
            anchorY={"middle"}

          >
            {gpu.chipset}
          </Text>
          <Text
            position={[0,-.4,0]}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            color={0xffffff}
            fontSize={0.14}
            anchorX={"left"}
            anchorY={"middle"}
          >
            {gpu.modelName}
          </Text>
        </group>
        <group name="scaler" scale={[gpu.width, gpu.depth, gpu.height]}>
          <Gpu scale={1}/>
        </group>
      </group>
    </group>
  );
};

export default Model;
