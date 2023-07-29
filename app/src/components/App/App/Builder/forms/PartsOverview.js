import Layout from 'components/Design/Models/Layout'
import React from 'react'
import CpuModel from "../../../Cpus/detail/Model/Model"
import CpuCoolerModel  from "../../../CpuCoolers/detail/Model/Model"
import MotherboardModel  from "../../../Motherboards/detail/Model/Model"
import GpuModel from "../../../Gpu/detail/Model/Model"
import MemoryModel from "../../../Ram/detail/Model/Model"

const PartsOverview = ({currentBuild}) => {

  currentBuild = {
    ...currentBuild,
    ram: {
      ...currentBuild.ram,
      stickAmount: currentBuild.motherboard.memorySlots,
    }
  }

  return (
    // TODO: overview model
    <>    
      {console.log(currentBuild)}
      <div>
        <p>PartsOverview<br/>
        <span style={{opacity: '0.5', fontSize: '1rem'}}>This render may not be fully accurate to your build</span>
        </p>
      </div>
      <div className="model" style={{height: "60vh"}}>
        <Layout>
          <CpuModel cpu={currentBuild.cpu} scale={.8} position={[0.03,1.08,-0.14]} rotation={[0,0, -Math.PI / 2]}/>
          <CpuCoolerModel cooler={currentBuild.cpucooler} scale={.8} position={[0.005,1.08,-.2]} rotation={[Math.PI / 2,0, 0]} />
          <MotherboardModel motherboard={currentBuild.motherboard} />
          <GpuModel gpu={currentBuild.gpu} position={[-2.5 + (currentBuild.gpu.width/100), -.15+ (-currentBuild.gpu.height/100), currentBuild.gpu.depth/100 - .1]} scale={1} rotation={[-Math.PI / 2,0, 0]}/>
          <MemoryModel ram={currentBuild.ram} scale={1.23} ramOffset={.165} position={[1.68,1,.11]} rotation={[ 0, -Math.PI / 2, -Math.PI / 2]}/>
        </Layout>
      </div>
    </>
  )
}

export default PartsOverview