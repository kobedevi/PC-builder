import { Text, Text3D, useGLTF } from "@react-three/drei";
import React from "react";
import { Gpu } from "./assets/Gpu";

const Model = ({ gpu }) => {

  return (
    <group name="Gpu" anchorX={"left"} position={[-(gpu.width/100) , 0 ,0]}>
      <group name="text" position={[.4, (gpu.depth/100) , -.01]}>
        <Text
          // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          color={0xffffff}
          fontSize={0.1}
          anchorX={"left"}
        >
          {gpu.manufacturerName}
        </Text>
        <Text
          position={[0,-.2,0]}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          color={0xffffff}
          fontSize={0.14}
          anchorX={"left"}
        >
          {gpu.chipset}
        </Text>
        <Text
          position={[0,-.4,0]}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          color={0xffffff}
          fontSize={0.14}
          anchorX={"left"}
        >
          {gpu.modelName}
        </Text>
      </group>
      <group name="scaler" scale={[gpu.width/100, gpu.depth/100, gpu.height/100 ]}>
        <Gpu scale={1}/>
      </group>
    </group>
  );
};

export default Model;
