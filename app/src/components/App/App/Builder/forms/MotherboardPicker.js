import MotherboardSelect from 'components/util/builder/MotherboardSelect'

const MotherboardPicker = ({currentBuild, updateBuild, hiddenInput, maxWidth, updateFields}) => {
  return (
    <div>
        <h2>Motherboard picker:</h2>
        <input className="HideInput" ref={hiddenInput} onChange={() => {}} tabIndex="-1" style={{color:"black"}} value={currentBuild.motherboard.idMotherboard} required type="text"/>
        <MotherboardSelect
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          idMotherboard = {currentBuild.motherboard.idMotherboard}
          idCpu = {currentBuild.cpu.idProcessor}
          width = {maxWidth}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default MotherboardPicker