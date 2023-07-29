import { Mask, Text, useGLTF } from "@react-three/drei";
import React from "react";
import {Memory} from "./assets/Memory";

const Model = ({ ram, scale=2, rotation=[0,0,0], position=[0,0,0], ramOffset=.23 }) => {
  console.log(ram)
  
  return (
    <group name="manipulator" scale={scale} rotation={rotation} position={position}>
      <group name="ramSticks">
        {Array(ram.stickAmount)
          .fill(null)
          .map((value, index) => {
            return (
              <group name="ramStick" position={[0,0,index * ramOffset]}>
                <React.Suspense fallback={null}>
                  <Text
                    position={[-.85, .3, 0]}
                    // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    color={0x666666}
                    fontSize={0.07}
                    anchorX={"left"}
                  >
                    {ram.ramType}
                  </Text>
                  <Text
                    position={[-.85, 0.25, 0]}
                    // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    color={0xaaaaaa}
                    fontSize={0.03}
                    anchorX={"left"}
                    anchorY={"top"}
                  >
                    {ram.sizePerStick}GB
                  </Text>
                  <Text
                    maxWidth={.4}
                    position={[-.25, 0.03, 0]}
                    // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    color={0xaaaaaa}
                    fontSize={0.08}
                    anchorX={"right"}
                    anchorY={"bottom"}
                    textAlign={"right"}
                  >
                    {ram.modelName} 
                  </Text>
                  <Text
                    maxWidth={.7}
                    position={[.2, 0.075, 0]}
                    // Google fonts now only uses woff2 which isnt supported, solution is to host own woff files but cors policy gets in the way for localhost
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    color={0x666666}
                    fontSize={0.1}
                    anchorX={"left"}
                    anchorY={"middle"}
                    textAlign={"left"}
                  >
                    {ram.manufacturerName.toUpperCase()} 
                  </Text>
                </React.Suspense>
                <group name="ram" rotation={[0, -Math.PI/2 ,0 ]}>
                  <Memory/>
                </group>
              </group>
            )
          }
        )}
      </group>
    </group>
  );
};

export default Model;
