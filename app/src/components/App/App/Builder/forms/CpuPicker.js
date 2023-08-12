import CpuSelect from 'components/util/builder/CpuSelect'

const CpuPicker = ({hiddenInput, currentBuild, updateBuild, idCpuSocket, cooler, updateFields}) => {
  
  return (
    <div>
        <h2>cpu picker:</h2>
        {/* Input has to have an onChange or be readOnly, readonly is not an option because inputs become not required, empty onChanges remove the warnings while still being required  */}
        <input ref={hiddenInput} className="HideInput" onChange={() => {}} tabIndex="-1" style={{color:"black"}} value={currentBuild.cpu.idProcessor} required={true} type="text"/>
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