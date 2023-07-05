import RamSelect from 'components/util/builder/RamSelect'

const RamPicker = ({idRamType, strictMode, setStrictMode, currentBuild, updateBuild, hiddenInput, idRam, memorySlots, updateFields}) => {
  return (
    <div>
        Memory picker:
        <input className="HideInput" ref={hiddenInput} tabIndex="-1" style={{color:"black"}} value={idRam} required type="text"/>
        <RamSelect
          strictMode={strictMode} 
          setStrictMode={setStrictMode}
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          idRamType={idRamType}
          idRam={idRam}
          memorySlots = {memorySlots}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default RamPicker