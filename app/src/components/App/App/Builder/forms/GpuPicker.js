import GpuSelect from 'components/util/builder/GpuSelect'

const GpuPicker = ({idGpu, hiddenInput, pcieSlots, maxDepth, maxWidth, updateFields}) => {
  return (
    <div>
        Video Card picker:
        <input className="HideInput" ref={hiddenInput} tabIndex="-1" style={{color:"black"}} value={idGpu} type="text"/>
        <p>idGpu: {idGpu}</p>
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