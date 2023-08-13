import Layout from 'components/Design/Models/Layout'
import Model  from "./Model/Model"
import Input from 'components/Design/Input'
import { PossibleRoutes, route } from 'core/routing'
// import CaseModel from "../../../Cases/detail/Model/Model"

const PartsOverview = ({currentBuild}) => {

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
            <Model motherboard={currentBuild.motherboard} psu={currentBuild.psu} pccase={currentBuild.case} gpu={currentBuild.gpu} cpucooler={currentBuild.cpucooler} ram={currentBuild.ram}/>
          </group>
        </Layout>
      </div>
    </>
  )
}

export default PartsOverview