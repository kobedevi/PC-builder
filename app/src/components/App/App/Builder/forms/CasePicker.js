import CaseSelect from 'components/util/builder/CaseSelect'

const CasePicker = ({currentBuild, updateBuild, idCase, hiddenInput, formfactor, maxWidth, maxHeight, maxDepth , updateFields}) => {
  return (
    <div>
        <h2>Case picker:</h2>
        <input className="HideInput" ref={hiddenInput} onChange={() => {}} tabIndex="-1" style={{color:"black"}} value={idCase} required type="text"/>
        <CaseSelect
          currentBuild = {currentBuild}
          updateBuild = {updateBuild}
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