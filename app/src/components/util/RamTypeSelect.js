import { useState, useEffect, useCallback, useRef } from "react";
import Select from "../Design/Select";
import useFetch from "../../core/hooks/useFetch";
import Alert from "../Design/Alert";
import * as yup from "yup";
import { getValidationErrors } from "../../core/utils/validation";
import { Link } from "react-router-dom";
import Input from "../Design/Input";
import Button from "../Design/Button";
import Spinner from "../Design/Spinner";
import useAuthApi from "../../core/hooks/useAuthApi";
import { createRamType, fetchRamTypes } from "core/modules/RamType/api";
import ErrorAlert from "components/shared/ErrorAlert";

const schema = yup.object().shape({
  newRamType: yup.string().required(),
});

const RamTypeSelect = (props) => {
  const inputRef = useRef(null);
  const withAuth = useAuthApi();

  const [localDisabled, setLocalDisabled] = useState(props.disabled);
  const [newRamType, setNewRamType] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchRamTypes();
  }, []);

  const {
    data: ramTypes,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  const options = ramTypes
    ? ramTypes.map((m) => ({
        value: m.idRamType,
        label: m.ramType,
      }))
    : null;

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setNewRamType({});
  };

  const validate = useCallback(async (newRamType, onSuccess) => {
    await schema
      .validate(newRamType, { abortEarly: false })
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
      validate(newRamType);
    }
  }, [validate, isTouched, newRamType]);

  const handleChange = (e) => {
    setNewRamType({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setLocalDisabled(true);
    withAuth(
      createRamType({
        ramType: newRamType.newRamType,
      })
    )
      .then((e) => {
        setLocalDisabled(false);
        refresh();
        setInfo(e);
        setErrors({})
        toggleHide();
        setNewRamType();
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
    validate(newRamType, () => onSubmit(newRamType)).then(() => {
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
            {isHidden ? "Add new RAM type" : "Cancel"}
          </Link>
          <div className={isHidden ? "hide" : "formShow"}>
            <h4>Create new RAM type:</h4>
            {Object.keys(errors).length > 0 && <ErrorAlert error={errors} />}
            <Input
              label="RAM type"
              type="text"
              onChange={handleChange}
              disabled={localDisabled}
              name="newRamType"
              id="newRamType"
              error={errors.newRamType}
              ref={inputRef}
            />
            <Button
              disabled={localDisabled}
              className="mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              Add RAM type
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RamTypeSelect;
