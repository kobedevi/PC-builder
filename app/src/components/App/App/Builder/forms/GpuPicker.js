import GpuSelect from 'components/util/builder/GpuSelect'

const GpuPicker = ({idGpu, pcieSlots, maxDepth, maxWidth, updateFields}) => {
  return (
    <div>
        Video Card picker:
        <input tabIndex="-1" style={{color:"black"}} value={idGpu} type="text"/>
        <GpuSelect
          idGpu={idGpu}
          pcieSlots = {pcieSlots}
          depth = {maxDepth}
          width = {maxWidth}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default GpuPicker