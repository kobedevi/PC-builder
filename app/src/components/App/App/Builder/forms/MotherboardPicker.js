import MotherboardSelect from 'components/util/builder/MotherboardSelect'

const MotherboardPicker = ({currentBuild, updateBuild, hiddenInput, idMotherboard, idCpu, maxWidth, updateFields}) => {
  return (
    <div>
        Motherboard picker:
        <input className="HideInput" ref={hiddenInput} tabIndex="-1" style={{color:"black"}} value={idMotherboard} required type="text"/>
        <MotherboardSelect
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          idMotherboard = {idMotherboard}
          idCpu = {idCpu}
          width = {maxWidth}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default MotherboardPicker