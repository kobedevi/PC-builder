import { useGLTF } from "@react-three/drei";
import React, {useRef,} from "react";
import memorySlotModel from "./assets/DIMMSlot.glb";
import pcieModel from "./assets/Pcie.glb";
import socketModel from "./assets/Socket.glb";
import sataModel from "./assets/Sata.glb";
import powerModel from "./assets/Power.glb";

import {Nvme} from "./Nvme";

const Model = ({ motherboard }) => {
  const { scene: memorySlot } = useGLTF(memorySlotModel, true);
  const { scene: pcieSlot } = useGLTF(pcieModel, true);
  const { scene: socket } = useGLTF(socketModel, true);
  const { scene: sataPort } = useGLTF(sataModel, true);
  const { scene: power } = useGLTF(powerModel, true);

  motherboard = {
    ...motherboard,
    width: (motherboard.width / 100),
    height: (motherboard.height / 100)
  }
  const offset = .2;

  return (
    <>
    <group name="mb" rotation={[Math.PI / 2, 0, 0]} scale={1.75} position={[0 , 0, -offset]}>
      <group name="base" scale={1} position={[0, 0, 0]} >
        <mesh
          castShadow={true}
          receiveShadow={true}
        >
          <boxGeometry args={[ motherboard.width, 0.02, motherboard.height]}/>
          <meshStandardMaterial metalness={1}/>
        </mesh>
      </group>
      <group name="socket" rotation={[Math.PI / -2, 0, 0]} position={[motherboard.width * .185  ,0 , -motherboard.height * .3]}>
        <mesh
          castShadow={true}
          receiveShadow={true}
        >
          <primitive 
            object={socket}
          />
        </mesh>
      </group>
      <group name="nvme" rotation={[Math.PI / -2, 0, 0]} position={[(motherboard.width /2)  , 0, ((-motherboard.height / 2))]} scale={1}>
        <group name="nvmeScaler" scale={.1} position={[-offset, -motherboard.height * .8, 0]}>
          <Nvme/>
        </group>
      </group>
      <group name="io" position={[-motherboard.width / 2 + .25, .21, -motherboard.height / 2 + motherboard.height / 4]}>
        <mesh
            castShadow={true}
            receiveShadow={true}
          >
          <boxGeometry args={[ .5, .4, motherboard.height / 2]}/>
          <meshStandardMaterial/>
        </mesh>
      </group>
      <group name="pcieSlots" rotation={[Math.PI / -2, 0, 0]} scale={1} position={[(-motherboard.width / 2 + offset) , 0, .25 ]}>
        {Array(motherboard.pcieSlots)
          .fill(null)
          .map((value, index) => {
            
            const clone = pcieSlot.clone();
            return (
              <group name="pcieSlot" key={index} position={[0,-index * .25,0]}>
                <mesh
                  castShadow={true}
                  receiveShadow={true}
                >
                  <primitive 
                    object={clone}
                    key={index}
                  />
                </mesh>
              </group>
            )
          }
        )}
      </group>
      <group name="memoryslots" rotation={[Math.PI / -2, 0, 0]} scale={1} position={[(motherboard.width /2 - offset)  , 0, ((-motherboard.height / 2) + offset) ]}>
        {Array(motherboard.memorySlots)
          .fill(null)
          .map((value, index) => {
            
            const clone = memorySlot.clone();
            return (
              <group name="memoryslot" key={index} position={[-index * .12,0,0]}>
                <mesh
                  castShadow={true}
                  receiveShadow={true}
                >
                  <primitive 
                    object={clone}
                    key={index}
                  />
                </mesh>
              </group>
            )
          }
        )}
      </group>
      <group name="sataPorts" rotation={[Math.PI / -2, 0, 0]} position={[(motherboard.width /2)  , 0, ((-motherboard.height / 2))]}>
        {Array(motherboard.sataPorts)
          .fill(null)
          .map((value, index) => {
            
            const clone = sataPort.clone();
            return (
              <group name="sataPort" key={index} position={[0,(index % 2 === 0 ?(-motherboard.height * .6) -index *.07 : (-motherboard.height * .6) - (Math.floor(index/2) *.14)), (index % 2 === 0 ? 0 : .06)]}>
                <mesh
                  castShadow={true}
                  receiveShadow={true}
                >
                  <primitive 
                    object={clone}
                    key={index}
                  />
                </mesh>
              </group>
            )
          }
        )}
      </group>
      <group name="power" rotation={[Math.PI / -2, 0, 0]} position={[(motherboard.width /2 - offset * .175)  , 0, ((-motherboard.height * .25)) ]}>
        <mesh
          castShadow={true}
          receiveShadow={true}
        >
          <primitive 
            object={power}
          />
        </mesh>
      </group>
    </group>
    </>
  );
};

export default Model;
