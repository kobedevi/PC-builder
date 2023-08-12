import CpuCoolerSelect from 'components/util/builder/CpuCoolerSelect'

const CpuCoolerPicker = ({currentBuild, updateBuild, hiddenInput, updateFields}) => {
  return (
    <div>
        <h2>cpu cooler picker:</h2>
        <input className="HideInput" ref={hiddenInput} onChange={() => {}} tabIndex="-1" style={{color:"black"}} value={currentBuild.cpucooler.idCpuCooler} required type="text"/>
        <CpuCoolerSelect
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          idCpu={currentBuild.cpu.idProcessor}
          idCpuCooler={currentBuild.cpucooler.idCpuCooler}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default CpuCoolerPicker