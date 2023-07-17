import { Text } from "@react-three/drei";
import React from "react";

import {Cpu} from "./Cpu";


const Model = ({ cpu }) => {

  return (
    <group name="cpu" scale={2.5}>
      <group name="base" position={[0, 0, 0]} scale={.05}rotation={[Math.PI / 2, 0, 0]}>
         <Cpu/>
      </group>
      <group name="info">
        <mesh position={[0, 0.15, -0.09]} receiveShadow={true}>
          <React.Suspense fallback={null}>
            <Text
              position={[0, 0.2, 0.17]}
              // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              color={0x333333}
              fontSize={0.14}
            >
              {cpu.manufacturerName ? cpu.manufacturerName : "Unknown"}
            </Text>
            <Text position={[0, 0, 0.17]} color={0x333333} fontSize={0.08}>
              {cpu.modelName}
            </Text>
            <Text position={[0, -0.1, 0.17]} color={0x333333} fontSize={0.08}>
              {cpu.clockSpeed} GHz
            </Text>
            <Text position={[0, -0.3, 0.17]} color={0x333333} fontSize={0.08}>
              {cpu.cores} cores
            </Text>
            <Text position={[0, -0.5, 0.17]} color={0x333333} fontSize={0.08}>
              {cpu.wattage ? cpu.wattage : "Unknown "}W
            </Text>
          </React.Suspense>
        </mesh>
      </group>
    </group>
  );
};

export default Model;
