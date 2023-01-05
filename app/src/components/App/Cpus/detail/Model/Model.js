import React from "react";
import { Text } from "@react-three/drei";
import { DoubleSide, FrontSide } from "three";

const Model = ({ cpu, brandName }) => {
  return (
    <>
      <group name="Cpu">
        <group name="CpuPlate">
          <mesh receiveShadow={true}>
            <boxGeometry args={[2, 2, 0.1]} />
            <meshStandardMaterial
              color={0x2b6b30}
              opacity={1}
              side={DoubleSide}
            />
          </mesh>
        </group>
        <group name="CpuIHS">
          <mesh position={[0, 0, 0.1]} receiveShadow={true}>
            <boxGeometry args={[1.7, 1.7, 0.1]} />
            <meshStandardMaterial
              color={0x999999}
              opacity={1}
              side={FrontSide}
            />
          </mesh>
          <group name="info">
            <mesh position={[0, 0.15, 0]} receiveShadow={true}>
              <React.Suspense fallback={null}>
                <Text
                  position={[0, 0.2, 0.17]}
                  // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
                  font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                  color={0x333333}
                  fontSize={0.14}
                >
                  {brandName}
                </Text>
                <Text position={[0, 0, 0.17]} color={0x333333} fontSize={0.08}>
                  {cpu.modelName}
                </Text>
                <Text
                  position={[0, -0.1, 0.17]}
                  color={0x333333}
                  fontSize={0.08}
                >
                  {cpu.clockSpeed} GHz
                </Text>
                <Text
                  position={[0, -0.3, 0.17]}
                  color={0x333333}
                  fontSize={0.08}
                >
                  {cpu.cores} cores
                </Text>
                <Text
                  position={[0, -0.5, 0.17]}
                  color={0x333333}
                  fontSize={0.08}
                >
                  {cpu.wattage ? cpu.wattage : "Unknown "}W
                </Text>
              </React.Suspense>
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
};

export default Model;
