import CpuCoolerSelect from 'components/util/builder/CpuCoolerSelect'

const CpuCoolerPicker = ({idCpuCooler, idCpu, updateFields}) => {
  return (
    <div>
        cpu cooler picker:
        <input tabIndex="-1" style={{color:"black"}} value={idCpuCooler} required type="text"/>
        <CpuCoolerSelect
          idCpu={idCpu}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default CpuCoolerPicker