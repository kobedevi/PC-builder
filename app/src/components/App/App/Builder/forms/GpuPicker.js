import GpuSelect from 'components/util/builder/GpuSelect'

const GpuPicker = ({currentBuild, updateBuild, idGpu, hiddenInput, pcieSlots, maxDepth, maxWidth, updateFields}) => {
  return (
    <div>
        Video Card picker:
        <input className="HideInput" ref={hiddenInput} readOnly={true} tabIndex="-1" style={{color:"black"}} value={idGpu} type="text"/>
        <GpuSelect
          currentBuild = {currentBuild}
          updateBuild = {updateBuild}
          idGpu = {idGpu}
          pcieSlots = {pcieSlots}
          depth = {maxDepth}
          width = {maxWidth}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default GpuPicker