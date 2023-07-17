import PsuSelect from 'components/util/builder/PsuSelect'

const PsuPicker = ({currentBuild, updateBuild, hiddenInput, idRam, memorySlots, updateFields}) => {
  const totalTdp = Math.round(( parseInt((currentBuild.cpu.wattage ??=0)) + parseInt((currentBuild.gpu.wattage ??=0))  + parseInt(((currentBuild.motherboard.sataPorts ??=0) * 5) + 75)) / 50)*50;
  console.log(totalTdp);

  return (
    <div>
        PSU picker:
        <input className="HideInput" ref={hiddenInput} onChange={() => {}} tabIndex="-1" style={{color:"black"}} value={idRam} required type="text"/>
        <p>Minimum recommended wattage: {totalTdp}</p>
        <PsuSelect
          minWat={totalTdp}
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          idRam={idRam}
          memorySlots = {memorySlots}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default PsuPicker