import ErrorAlert from 'components/shared/ErrorAlert';
import CpuSelect from 'components/util/builder/CpuSelect'

const CpuPicker = ({updateFields}) => {
  return (
    <div>
        cpu picker:
        <CpuSelect
          updateFields={updateFields}
          label="Cpu Socket"
          name="idCpuSocket"
        />
    </div>
  )
}

export default CpuPicker