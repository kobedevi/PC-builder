import RamSelect from 'components/util/builder/RamSelect'

const RamPicker = ({strictMode, setStrictMode, currentBuild, updateBuild, hiddenInput, updateFields}) => {
  return (
    <div>
        <h2>Memory picker:</h2>
        <input className="HideInput" ref={hiddenInput} onChange={() => {}} tabIndex="-1" style={{color:"black"}} value={currentBuild.ram.idRam} required type="text"/>
        <RamSelect
          strictMode={strictMode} 
          setStrictMode={setStrictMode}
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          idRamType={currentBuild.motherboard.idRamType}
          idRam={currentBuild.ram.idRam}
          memorySlots = {currentBuild.motherboard.memorySlots}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default RamPicker