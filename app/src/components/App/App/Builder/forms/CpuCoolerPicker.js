import CpuCoolerSelect from 'components/util/builder/CpuCoolerSelect'

const CpuCoolerPicker = () => {
  return (
    <div>
        cpu cooler picker:
        <CpuCoolerSelect
            label="Cpu Socket"
            name="idCpuSocket"
        />
    </div>
  )
}

export default CpuCoolerPicker