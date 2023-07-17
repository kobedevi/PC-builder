import CpuSelect from 'components/util/builder/CpuSelect'

const CpuPicker = ({hiddenInput, idCpu, currentBuild, updateBuild, idCpuSocket, cooler, updateFields}) => {
  
  return (
    <div>
        cpu picker:
        {/* Input has to have an onChange or be readOnly, readonly is not an option because inputs become not required, empty onChanges remove the warnings while still being required  */}
        <input ref={hiddenInput} className="HideInput" onChange={() => {}} tabIndex="-1" style={{color:"black"}} value={idCpu} required={true} type="text"/>
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