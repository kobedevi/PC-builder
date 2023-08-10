import StorageSelect from 'components/util/builder/StorageSelect'
import { useEffect, useMemo, useState } from 'react'

const StoragePicker = ({strictMode, setStrictMode, currentBuild, updateBuild, hiddenInput, storage, smallSlots, largeSlots, m2Slots, updateFields}) => {

  const [drives, setDrives] = useState(storage);
  const [warnings, setWarnings] = useState(new Set())

  useEffect(() => {
    updateBuild({
      storage: drives,
    })
    updateFields({
      storage: drives
    })
 }, [drives]);

  const addWarning = (item) => {
    setWarnings(prev => new Set(prev).add(item));
  }

  const removeWarning = (item) => {
    setWarnings(prev => {
      const next = new Set(prev);
      next.delete(item);
      return next;
    });
  }

  const warningChecker = useMemo(() => {
    setWarnings(new Set());
    currentBuild.motherboard.storage.map((item) => {
      const id = item.idStorageType
      const count = drives.filter((obj) => obj.idStorageType === id).length;    
      // Creating unique set of only idStorageType, converting to array so filter can be used
      const keyArray = drives.map((item) => { 
        return { 
          idStorageType: item.idStorageType, 
          storageType: item.storageType
        } 
      });
      const tempDrives = Array.from(new Set(keyArray))
      const results = new Set(tempDrives.filter(({ idStorageType: id1 }) => !currentBuild.motherboard.storage.some(({ idStorageType: id2 }) => id2 === id1)));
      
      if(count > item.amount){
        addWarning(`You don't have enough ${item.type} connections for all the selected storage`);
      } else if (count <= item.amount) {
        removeWarning(`You don't have enough ${item.type} connections for all the selected storage`);
      }if(results.size === 0) {
        Array.from(results).map(item => {
          removeWarning(`You don't have enough ${item.storageType} connections for all the selected storage`);
        })
      }
      if(results.size > 0) {
        Array.from(results).map(item => {
          addWarning(`You don't have enough ${item.storageType} connections for all the selected storage`);
        })
      }
      return;
    })
  }, [drives, currentBuild.motherboard]);

  return (
    <div>
        <h2>Storage picker:</h2>
        {/* Read only because, "read only is more correct and input is not required" */}
        <input className="HideInput" ref={hiddenInput} readOnly={true} tabIndex="-1" style={{color:"black"}} value={drives[0]?.modelName} type="text"/>
        <div>
          {drives.map((s, index) => {
            return (
              <div key={s.localId} className="form-group selectArray">
                <input
                  key={index}
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
          strictMode={strictMode} 
          setStrictMode={setStrictMode}
          warnings={warnings}
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