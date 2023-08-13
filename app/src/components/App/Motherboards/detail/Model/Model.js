import { useGLTF } from "@react-three/drei";
import memorySlotModel from "./assets/DIMMSlot.glb";
import pcieModel from "./assets/Pcie.glb";
import socketModel from "./assets/Socket.glb";
import sataModel from "./assets/Sata.glb";
import powerModel from "./assets/Power.glb";
import memModel from "../../../Ram/detail/Model/assets/memory.glb";
import cpuModel from "../../../Cpus/detail/Model/assets/cpu.glb";

import coolerBaseModel  from "../../../CpuCoolers/detail/Model/assets/cooler_base.glb"
import coolerFinsModel  from "../../../CpuCoolers/detail/Model/assets/cooler_fin.glb"
import gpuCubeModel  from "../../../Gpu/detail/Model/assets/gpuCube.glb"
import caseCubeModel  from "../../../Cases/detail/Model/assets/caseCubeCompressed.glb"

import {Nvme} from "./Nvme";

const Model = ({ram, motherboard, cpucooler, gpu, pccase}) => {
  const { scene: memorySlot } = useGLTF(memorySlotModel, true);
  const { scene: pcieSlot } = useGLTF(pcieModel, true);
  const { scene: socket } = useGLTF(socketModel, true);
  const { scene: sataPort } = useGLTF(sataModel, true);
  const { scene: power } = useGLTF(powerModel, true);  


  const { scene: memory } = useGLTF(memModel, true);
  const { scene: cpu } = useGLTF(cpuModel, true);
  const { scene: cooler_base } = useGLTF(coolerBaseModel, true);
  const { scene: cooler_fins } = useGLTF(coolerFinsModel, true);
  const { scene: gpuModel } = useGLTF(gpuCubeModel, true);
  const { scene: caseModel} = useGLTF(caseCubeModel, true);


  motherboard = {
    ...motherboard,
    width: (motherboard.width / 100),
    height: (motherboard.height / 100),
    // width: (453 / 100),
    // height: (466 / 100)
  }
  const offset = .2;

  cpucooler.height = 230

  // TODO: add all if else conditions!!!!
  const finAmount = Math.round((cpucooler.height/100 - 37.84/100) * 1.36 * 20);

  return (
    <group name="total" position={[-pccase.width/200, pccase.height/200, -pccase.depth/200]}>
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
            <primitive 
              object={socket}
            />
          </mesh>
          <primitive 
            scale={.95}
            position={[-.15,-.01,.03]}
            object={cpu}
          />
          <group name="cooler" scale={.35} rotation={[Math.PI / 2, 0, 0]} position={[-.45, -.3, 0]}>
            <primitive 
              scale={[.45,1,.45]}
              object={cooler_base}
            />
            <group name="trueScale" scale={[.45,1,.85]}>
              <group name="fins" position={[0, .7, 0]} scale={[cpucooler.width/100, .3, cpucooler.width/100]}>
                {Array(finAmount)
                  .fill(null)
                  .map((value, index) => {
                    const clone = cooler_fins.clone();
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
          </group>
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
          <group name="trueSize" scale={.5} position={[-offset -.025,-.053,.03]}>
            <primitive 
              scale={[gpu.width/100, gpu.depth/100, gpu.height/100]}
              rotation={[Math.PI / -2, 0, 0]}
              position={[-.15,-.01,.03]}
              object={gpuModel}
            />
          </group>
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
        <group name="memoryslots" rotation={[Math.PI / -2, 0, 0]} scale={1} position={[(motherboard.width /2 - offset)  , 0, ((-motherboard.height / 2) + (offset/2)) ]}>
          {Array(motherboard.memorySlots)
            .fill(null)
            .map((value, index) => {
              
              const clone = memorySlot.clone();
              const memClone = memory.clone();
              return (
                <>
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
                  <group name="memory" key={index} position={[-index * .12,0,0]}>
                    <mesh
                      castShadow={true}
                      receiveShadow={true}
                    >
                      <primitive 
                        object={memClone}
                        key={index}
                      />
                    </mesh>
                  </group>
                </>
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
      <group name="case" scale={1} position={[-motherboard.width, motherboard.height , -.5]}>
        <primitive 
          scale={[pccase.width/100, pccase.height/100, pccase.depth/100]}
          object={caseModel}
        />
      </group>
    </group>
  );
};

export default Model;
