import CpuCoolerSelect from 'components/util/builder/CpuCoolerSelect'

const CpuCoolerPicker = ({idCpuCooler, updateFields}) => {
  return (
    <div>
        cpu cooler picker:
        <input tabindex="-1" style={{color:"black"}} value={idCpuCooler} required type="text"/>
        <CpuCoolerSelect
          updateFields = {updateFields}
        />
    </div>
  )
}

export default CpuCoolerPicker