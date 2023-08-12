import Layout from 'components/Design/Models/Layout'
import React from 'react'
import CpuModel from "../../../Cpus/detail/Model/Model"
import CpuCoolerModel  from "../../../CpuCoolers/detail/Model/Model"
import MotherboardModel  from "../../../Motherboards/detail/Model/Model"
import GpuModel from "../../../Gpu/detail/Model/Model"
import MemoryModel from "../../../Ram/detail/Model/Model"
import Input from 'components/Design/Input'
import { PossibleRoutes, route } from 'core/routing'
// import CaseModel from "../../../Cases/detail/Model/Model"

const PartsOverview = ({currentBuild}) => {

  currentBuild = {
    ...currentBuild,
    ram: {
      ...currentBuild.ram,
      stickAmount: currentBuild.motherboard.memorySlots,
    }
  }
  const mbScale = 1.75
  console.log(`test: ${currentBuild.motherboard.height * .01 + .4}`);
  console.log(`test: ${(-currentBuild.motherboard.height / 2 + .2) * mbScale}`);


  return (
    // TODO: overview model
    <>
      <div>
        <>
        <h2>PartsOverview</h2><br/>
        <span style={{opacity: '0.5', fontSize: '1rem'}}>This render may not be fully accurate to your build</span><br/>
        <Input readOnly={true} tabIndex="1" style={{color:"black"}} value={`${window.location.origin}${route(PossibleRoutes.BuildDetail, {id:currentBuild.id})}`} required type="text" />
        </>
      </div>
      <div className="model" style={{height: "60vh"}}>
        <Layout>
          <group name="parts">
            {/* <CpuModel cpu={currentBuild.cpu} scale={.8} position={[0.03,1.08,-0.14]} rotation={[0,0, -Math.PI / 2]}/> */}
            {/* <CpuCoolerModel cooler={currentBuild.cpucooler} scale={.8} position={[0.005,1.08,-.2]} rotation={[Math.PI / 2,0, 0]} /> */}
            {/* <MotherboardModel pccase={currentBuild.case} cpu={currentBuild.cpu} motherboard={currentBuild.motherboard} /> */}
            {/* <GpuModel gpu={currentBuild.gpu} position={[-2.5 + (currentBuild.gpu.width/100), -.15+ (-currentBuild.gpu.height/100), currentBuild.gpu.depth/100 - .1]} scale={1} rotation={[-Math.PI / 2,0, 0]}/> */}
            {/* <MemoryModel ram={currentBuild.ram} scale={1.23} ramOffset={.165} position={[1.68, (-currentBuild.motherboard.height / 2 + .2) * mbScale, .11]} rotation={[ 0, -Math.PI / 2, -Math.PI / 2]}/> */}
            <MotherboardModel motherboard={currentBuild.motherboard} ram={<MemoryModel ram={currentBuild.ram} scale={1.23} ramOffset={.165} position={[1.68,.45,.11]} rotation={[ 0, -Math.PI / 2, -Math.PI / 2]}/>}>

            </MotherboardModel>
          </group>
          {/* <CaseModel pccase={currentBuild.case} scale={1} position={[.9 ,0 , 0]}/> */}
        </Layout>
      </div>
    </>
  )
}

export default PartsOverview