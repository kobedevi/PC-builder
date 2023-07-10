import StorageSelect from 'components/util/builder/StorageSelect'
import { useEffect, useMemo, useState } from 'react'

const StoragePicker = ({currentBuild, updateBuild, hiddenInput, storage, smallSlots, largeSlots, m2Slots, updateFields}) => {

  const [drives, setDrives] = useState(storage);

  useEffect(() => {
    updateBuild({
      storage: drives,
    })
    updateFields({
      storage: drives
    })
 }, [drives]);

  return (
    <div>
        Storage picker:
        <input className="HideInput" ref={hiddenInput} tabIndex="-1" style={{color:"black"}} value={drives[0]?.modelName} type="text"/>
        <div>
          {drives.map((s, index) => {
            return (
              <div key={s.localId} className="form-group selectArray">
                <input
                  className="form-control hideInput"
                  readOnly={true}
                  value={s.modelName || ""}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setDrives(currentDrives => currentDrives.filter(x => x.localId !== s.localId))
                    updateFields({
                      storage: drives
                    })
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
        <StorageSelect
          currentBuild={currentBuild}
          updateBuild={updateBuild}
          drives={drives}
          setDrives={setDrives}
          smallSlots={smallSlots}
          largeSlots={largeSlots}
          m2Slots={m2Slots}
          updateFields = {updateFields}
        />
    </div>
  )
}

export default StoragePicker