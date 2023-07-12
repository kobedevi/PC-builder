import CpuSelect from 'components/util/builder/CpuSelect'

const CpuPicker = ({hiddenInput, idCpu, currentBuild, updateBuild, idCpuSocket, cooler, updateFields}) => {
  
  return (
    <div>
        cpu picker:
        <input ref={hiddenInput} className="HideInput" readOnly={true} tabIndex="-1" style={{color:"black"}} value={idCpu} required type="text"/>
        <CpuSelect
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          cooler={cooler}
          idCpuSocket={idCpuSocket}
          updateFields={updateFields}
        />
    </div>
  )
}

export default CpuPicker