import StorageSelect from 'components/util/builder/StorageSelect'
import { useEffect, useState } from 'react'

const StoragePicker = ({hiddenInput, storage, smallSlots, largeSlots, m2Slots, updateFields}) => {

  const temp = storage
  const [drives, setDrives] = useState(storage);

  useEffect(() => {
    updateFields({
      storage: drives
    })
 }, [drives]);

  return (
    <div>
        Storage picker:
        <input className='HiddenInput' ref={hiddenInput} tabIndex="-1" style={{color:"black"}} value={drives[0]?.modelName} readonly type="text"/>
        <div>
          {drives.map((s, index) => {
            return (
              <div key={s.localId} className="form-group selectArray">
                <input
                
                  className="form-control hideInput"
                  readOnly
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