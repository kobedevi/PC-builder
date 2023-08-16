import { useState, useEffect, useCallback, useRef } from "react";
import Select from "../Design/Select";
import { createStorageType, fetchStorageTypes } from "../../core/modules/StorageType/api";
import useFetch from "../../core/hooks/useFetch";
import Alert from "../Design/Alert";
import * as yup from "yup";
import { getValidationErrors } from "../../core/utils/validation";
import { Link } from "react-router-dom";
import Input from "../Design/Input";
import Button from "../Design/Button";
import Spinner from "../Design/Spinner";
import useAuthApi from "../../core/hooks/useAuthApi";
import ErrorAlert from "components/shared/ErrorAlert";

const schema = yup.object().shape({
  newStorageType: yup.string().required(),
});

const StorageTypeSelect = (props) => {
  const inputRef = useRef(null);
  const withAuth = useAuthApi();

  const [localDisabled, setLocalDisabled] = useState(props.disabled);
  const [newStorageType, setNewStorageType] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchStorageTypes();
  }, []);

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

  const toggleHide = (e=null) => {
    if(e) {
      e.preventDefault();
    }
    setIsHidden(!isHidden);
    setNewStorageType({});
  };

  const validate = useCallback(async (newStorageType, onSuccess) => {
    await schema
      .validate(newStorageType, { abortEarly: false })
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
      validate(newStorageType);
    }
  }, [validate, isTouched, newStorageType]);

  const handleChange = (e) => {
    setNewStorageType({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setLocalDisabled(true);
    withAuth(
      createStorageType({
        storageType: newStorageType.newStorageType,
      })
    )
      .then((e) => {
        setLocalDisabled(false);
        refresh();
        setInfo(e);
        setErrors({})
        toggleHide();
        setNewStorageType();
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
    validate(newStorageType, () => onSubmit(newStorageType)).then(() => {
      setIsTouched(false);
    });
  };

  return (
    <div className="form-group">
      {error && <Alert color="danger">{error.message}</Alert>}
      
      {info && <Alert color="info">{info.message}</Alert>}
      {isLoading && <Spinner />}
      {options && (
        <>
          <Select options={options} {...props} />
          <Link style={{ display: "inline-block" }} onClick={toggleHide}>
            {isHidden ? "Add new storage type" : "Cancel"}
          </Link>
          <div className={isHidden ? "hide" : "formShow"}>
            <h4>Create new Storage type:</h4>
            {Object.keys(errors).length > 0 && <ErrorAlert error={errors} />}
            <Input
              label="Storage type name"
              type="text"
              disabled={localDisabled}
              onChange={handleChange}
              name="newStorageType"
              id="newStorageType"
              error={errors.newStorageType}
              ref={inputRef}
            />
            <Button
              disabled={localDisabled}
              className="mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              Add Storage Type
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default StorageTypeSelect;
