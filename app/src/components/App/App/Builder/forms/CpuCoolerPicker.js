import CpuCoolerSelect from 'components/util/builder/CpuCoolerSelect'

const CpuCoolerPicker = ({currentBuild, updateBuild, hiddenInput, idCpuCooler, idCpu, updateFields}) => {
  return (
    <div>
        cpu cooler picker:
        <input className="HideInput" ref={hiddenInput} tabIndex="-1" style={{color:"black"}} value={idCpuCooler} required type="text"/>
        <CpuCoolerSelect
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          idCpu={idCpu}
          idCpuCooler={idCpuCooler}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default CpuCoolerPicker