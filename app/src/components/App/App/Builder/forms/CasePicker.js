import CaseSelect from 'components/util/builder/CaseSelect'

const CasePicker = ({idCase, hiddenInput, formfactor, maxWidth, maxHeight, maxDepth , updateFields}) => {
  return (
    <div>
        Case picker:
        <input className="HideInput" ref={hiddenInput} tabIndex="-1" style={{color:"black"}} value={idCase} required type="text"/>
        <CaseSelect
          idCase={idCase}
          formfactor = {formfactor}
          height = {maxHeight}
          width = {maxWidth}
          depth = {maxDepth}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default CasePicker