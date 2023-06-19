import CaseSelect from 'components/util/builder/CaseSelect'

const CasePicker = ({idCase, formfactor, height, width, depth , updateFields}) => {
  return (
    <div>
        Case picker:
        <input tabIndex="-1" style={{color:"black"}} value={idCase} required type="text"/>
        <CaseSelect
          idCase={idCase}
          formfactor = {formfactor}
          height = {height}
          width = {width}
          depth = {depth}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default CasePicker