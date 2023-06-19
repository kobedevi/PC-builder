import GpuSelect from 'components/util/builder/GpuSelect'

const GpuPicker = ({idGpu, pcieSlots, updateFields}) => {
  return (
    <div>
        Video Card picker:
        <input tabIndex="-1" style={{color:"black"}} value={idGpu} type="text"/>
        <GpuSelect
          idGpu={idGpu}
          pcieSlots = {pcieSlots}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default GpuPicker