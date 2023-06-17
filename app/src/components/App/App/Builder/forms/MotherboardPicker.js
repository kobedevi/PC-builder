import MotherboardSelect from 'components/util/builder/MotherboardSelect'

const MotherboardPicker = ({idMotherboard, idCpu, updateFields}) => {
  return (
    <div>
        Motherboard picker:
        <input tabIndex="-1" style={{color:"black"}} value={idMotherboard} required type="text"/>
        <MotherboardSelect
          idMotherboard={idMotherboard}
          idCpu={idCpu}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default MotherboardPicker