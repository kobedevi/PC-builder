import CaseSelect from 'components/util/builder/CaseSelect'

const CasePicker = ({currentBuild, updateBuild, hiddenInput, maxWidth, maxHeight, maxDepth , updateFields}) => {
  return (
    <div>
        <h2>Case picker:</h2>
        <input className="HideInput" ref={hiddenInput} onChange={() => {}} tabIndex="-1" style={{color:"black"}} value={currentBuild.case.idCase} required type="text"/>
        <CaseSelect
          currentBuild = {currentBuild}
          updateBuild = {updateBuild}
          idCase={currentBuild.case.idCase}
          formfactor = {currentBuild.motherboard.idFormfactor}
          height = {maxHeight}
          width = {maxWidth}
          depth = {maxDepth}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default CasePicker