import Layout from 'components/Design/Models/Layout'
import React from 'react'
import CpuCoolerModel from './Model/CpuCooler/CpuCoolerModel'
import CpuModel from './Model/Cpu/CpuModel'

const PartsOverview = ({currentBuild}) => {
  return (
    // TODO: overview model
    <>    
      <div>
        <p>PartsOverview<br/>
        <span style={{opacity: '0.5', fontSize: '1rem'}}>This render may not be fully accurate to your build</span>
        </p>
      </div>
      <div className="model">
        <Layout>
          {/* <CpuModel currentBuild={currentBuild} /> */}
          {/* <CpuCoolerModel currentBuild={currentBuild} /> */}
          {/* <MotherboardModel currentBuild={currentBuild} /> */}
        </Layout>
      </div>
    </>
  )
}

export default PartsOverview