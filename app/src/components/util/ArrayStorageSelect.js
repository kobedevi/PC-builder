import { useState, useEffect, useCallback, useRef } from "react";
import useFetch from "../../core/hooks/useFetch";
import Alert from "../Design/Alert";
import * as yup from "yup";
import { getValidationErrors } from "../../core/utils/validation";
import Input from "../Design/Input";
import Button from "../Design/Button";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import useAuthApi from "../../core/hooks/useAuthApi";
import { fetchStorageTypes, createStorageType } from "core/modules/StorageType/api";

const schema = yup.object().shape({
  storageType: yup.string().required(),
  amount: yup.number().positive().required(),
});

const ArrayStorageSelect = (
  {
    storageMethods,
    setStorageMethods,
    label,
    name,
    disabled,
    handleChange: handleSocketChange,
    setData,
    data: formData,
    error: formError,
  },
  props
) => {
  const inputRef = useRef(null);
  const withAuth = useAuthApi();

  const [localDisabled, setLocalDisabled] = useState(props.disabled);
  const [newStorage, setNewStorage] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchStorageTypes();
  }, []);

  useEffect(() => {
    setData({
      ...formData,
      storageMethods: [...storageMethods],
    });
  }, [storageMethods]);

  const {
    data: storageTypes,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  const options = storageTypes
    ? storageTypes.map((s) => ({
        value: s.idStorageType,
        label: s.storageType,
      }))
    : null;

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setNewStorage({});
  };

  const validate = useCallback(async (newStorage, onSuccess) => {
    await schema
      .validate(newStorage, { abortEarly: false })
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        setErrors(getValidationErrors(err));
      });
  }, []);

  useEffect(() => {
    if (isTouched) {
      validate(newStorage);
    }
  }, [validate, isTouched, newStorage]);

  const handleChange = (e) => {
    setNewStorage({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setLocalDisabled(true);
    withAuth(
      createStorageType({
        storageType: newStorage.storageType,
        amount: newStorage.amount,
      })
    )
      .then((e) => {
        setLocalDisabled(false);
        refresh();
        setInfo(e);
        toggleHide();
        setNewStorage();
        inputRef.current.value = "";
      })
      .catch((err) => {
        setErrors(err);
        setLocalDisabled(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);
    validate(newStorage, () => onSubmit(newStorage)).then(() => {
      setIsTouched(false);
    });
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}:</label>}
      {error && <Alert color="danger">{error.message}</Alert>}
      {formError && <Alert color="danger">{formError.message}</Alert>}
      {info && <Alert color="info">{info.message}</Alert>}

      {/* Code from Ben Awad
      https://www.youtube.com/watch?v=3GtAE9RZHVc */}
      {storageMethods.map((c, index) => {
        return (
          <div key={c.tempId} className="form-group selectArray">
            <select
              className="form-control"
              disabled={localDisabled}
              name={name}
              value={c.idStorageType || ""}
              onChange={(e) => {
                const storageType = e.target.value;
                setStorageMethods((currentStorageMethods) =>
                  produce(currentStorageMethods, (v) => {
                    v[index].idStorageType = storageType;
                  })
                );
              }}
            >
              <option>--</option>
              {options &&
                options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            <input 
              name="amount" 
              style={{borderRadius: 0}}
              className="form-control" 
              type="number" 
              placeholder="Amount" 
              onChange={(e) => {
                const amount = e.target.value;
                setStorageMethods((currentStorageMethods) =>
                  produce(currentStorageMethods, (v) => {
                    v[index].amount = parseInt(amount);
                  })
                );
              }}
            />

            <button
              className="btn btn-danger"
              disabled={localDisabled}
              onClick={() => {
                setStorageMethods((currentStorageMethods) =>
                  currentStorageMethods.filter(
                    (x) => x.idStorageType !== c.idStorageType
                  )
                );
              }}
            >
              x
            </button>
          </div>
        );
      })}

      <div className="mt-4">
        <button
          className="btn btn-primary"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            setStorageMethods((currentStorageMethods) => [
              ...currentStorageMethods,
              {
                tempId: uuidv4(),
                idStorageType: "",
                amount: 0,
              },
            ]);
          }}
        >
          Add storage method
        </button>

        <Button
          style={{ display: "inline-block" }}
          color="warning"
          className="ml-1"
          onClick={toggleHide}
        >
          {isHidden ? "Add new storage type" : "Cancel"}
        </Button>

        <div className={isHidden ? "hide" : "formShow mt-4"}>
          <h4>Create new Storage Type:</h4>
          <Input
            label="storage name"
            type="text"
            disabled={disabled}
            onChange={handleChange}
            name="storageType"
            id="storageType"
            error={errors.storageType}
            ref={inputRef}
          />
          <Button className="mt-4" type="submit" onClick={handleSubmit}>
            Add Storage connection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArrayStorageSelect;
