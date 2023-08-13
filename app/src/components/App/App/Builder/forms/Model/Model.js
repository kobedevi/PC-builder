import {useGLTF } from "@react-three/drei";
import memorySlotModel from "../../../../Motherboards/detail/Model/assets/DIMMSlot.glb";
import pcieModel from "../../../../Motherboards/detail/Model/assets/Pcie.glb";
import socketModel from "../../../../Motherboards/detail/Model/assets/Socket.glb";
import sataModel from "../../../../Motherboards/detail/Model/assets/Sata.glb";
import powerModel from "../../../../Motherboards/detail/Model/assets/Power.glb";

import memModel from "../../../../Ram/detail/Model/assets/memory.glb";
import cpuModel from "../../../../Cpus/detail/Model/assets/cpu.glb";
import coolerBaseModel  from "../../../../CpuCoolers/detail/Model/assets/cooler_base.glb"
import coolerFinsModel  from "../../../../CpuCoolers/detail/Model/assets/coolerFin_cube.glb"
import gpuCubeModel  from "../../../../Gpu/detail/Model/assets/gpuCube.glb"
import caseCubeModel  from "../../../../Cases/detail/Model/assets/caseCubeCompressed.glb"
import psuCubeModel  from "../../../../Psu/detail/Model/assets/psu_cube.glb"

import {Nvme} from "../../../../Motherboards/detail/Model/Nvme";

const Model = ({motherboard, cpucooler, gpu=null, pccase, psu, ram}) => {
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
  const { scene: psuModel} = useGLTF(psuCubeModel, true);


  motherboard = {
    ...motherboard,
    width: (motherboard.width / 100),
    height: (motherboard.height / 100),
  }
  const offset = .2;

  const finAmount = Math.round((cpucooler.height/100 - 37.84/100) * 1.36 * 20);

  return (
    <group name="total" position={[-pccase.width/350, pccase.height/350, -pccase.depth/200]} scale={.5}>
      <group name="mb" rotation={[Math.PI / 2, 0, 0]} scale={1.75} position={[.4 , -.4, -offset]}>
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
          <primitive 
            scale={.95}
            position={[-.15,-.01,.03]}
            object={cpu}
          />
          <group name="cooler" scale={1}>
            <group name="coolerBase" scale={.35} rotation={[Math.PI / 2, 0, 0]} position={[-.45, -.3, 0]}>
              <primitive 
                scale={[.45,1,.45]}
                object={cooler_base}
              />
            </group>
              <group name="fins" scale={.5} position={[-.45, -.3, .35]} rotation={[Math.PI/2, 0, 0]}>
                {Array(finAmount)
                  .fill(null)
                  .map((value, index) => {
                    const clone = cooler_fins.clone();
                    return (
                      <primitive
                        scale={[cpucooler.width/100, 1, 1]}
                        key={`fin${index}`}
                        object={clone}
                        position={[0, index * 0.136/2, 0]}
                      />
                    );
                  })}
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
            <meshStandardMaterial metalness={1}/>
          </mesh>
        </group>
        <group name="pcieSlots" rotation={[Math.PI / -2, 0, 0]} scale={1} position={[(-motherboard.width / 2 + offset) , 0, .25 ]}>
          <group name="trueSize" scale={.5} position={[-offset -.025,-.053,.03]}>
            {gpu && (
              <primitive 
                scale={[gpu.width/100, gpu.depth/100, gpu.height/100]}
                rotation={[Math.PI / -2, 0, 0]}
                position={[-.15,-.01,.03]}
                object={gpuModel}
              />
            )}
          </group>
          {Array(motherboard.pcieSlots)
            .fill(null)
            .map((value, index) => {
              
              const clone = pcieSlot.clone();
              return (
                <group name="pcieSlot" key={`pcieSlot${index}`} position={[0,-index * .25,0]}>
                  <mesh
                    castShadow={true}
                    receiveShadow={true}
                  >
                    <primitive 
                      object={clone}
                      key={`pcieSlotModel${index}`}
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
                  <group name="memoryslot" key={`memorySlot${index}`} position={[-index * .12,0,0]}>
                    <mesh
                      castShadow={true}
                      receiveShadow={true}
                    >
                      <primitive 
                        object={clone}
                        key={`memorySlotModel${index}`}
                      />
                    </mesh>
                  </group>
                  {!(index > ram.stickAmount-1) && (
                    <group name="memory" key={`memory${index}`} position={[-index * .12,0,0]}>
                      <mesh
                        castShadow={true}
                        receiveShadow={true}
                      >
                        <primitive 
                          object={memClone}
                          key={`memoryModel${index}`}
                        />
                      </mesh>
                    </group>
                  )}
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
                <group name="sataPort" key={`sataPort${index}`} position={[0,(index % 2 === 0 ?(-motherboard.height * .6) -index *.07 : (-motherboard.height * .6) - (Math.floor(index/2) *.14)), (index % 2 === 0 ? 0 : .06)]}>
                  <mesh
                    castShadow={true}
                    receiveShadow={true}
                  >
                    <primitive 
                      object={clone}
                      key={`sataPortModle${index}`}
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
      <group name="psu" rotation={[0, Math.PI/2, 0]} position={[-motherboard.width + .2, -pccase.height/100 + pccase.height/1000, pccase.depth/100 +.45]}>
        <group name="base">
          <primitive 
            scale={[psu.width/100, psu.height/100, psu.depth/100]}
            object={psuModel} 
          />
        </group>
      </group>
    </group>
  );
};

export default Model;
