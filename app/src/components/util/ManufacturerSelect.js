import { useState, useEffect, useCallback, useRef } from "react";
import Select from "../Design/Select";
import {
  createManufacturer,
  fetchManufacturers,
} from "../../core/modules/Manufacturer/api";
import useFetch from "../../core/hooks/useFetch";
import Alert from "../Design/Alert";
import * as yup from "yup";
import { getValidationErrors } from "../../core/utils/validation";
import { Link } from "react-router-dom";
import Input from "../Design/Input";
import Button from "../Design/Button";
import Spinner from "../Design/Spinner";
import useAuthApi from "../../core/hooks/useAuthApi";

const schema = yup.object().shape({
  newManufacturer: yup.string().required(),
});

const ManufacturerSelect = (props) => {
  const inputRef = useRef(null);
  const withAuth = useAuthApi();

  const [localDisabled, setLocalDisabled] = useState(props.disabled);
  const [newManuName, setNewManuName] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchManufacturers();
  }, []);

  const {
    data: manufacturers,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  const options = manufacturers
    ? manufacturers.map((m) => ({
        value: m.idManufacturer,
        label: m.manufacturerName,
      }))
    : null;

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setNewManuName({});
  };

  const validate = useCallback(async (newManuName, onSuccess) => {
    await schema
      .validate(newManuName, { abortEarly: false })
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
      validate(newManuName);
    }
  }, [validate, isTouched, newManuName]);

  const handleChange = (e) => {
    setNewManuName({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setLocalDisabled(true);
    withAuth(
      createManufacturer({
        manufacturerName: newManuName.newManufacturer,
      })
    )
      .then((e) => {
        setLocalDisabled(false);
        refresh();
        setInfo(e);
        toggleHide();
        setNewManuName();
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
    validate(newManuName, () => onSubmit(newManuName)).then(() => {
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
            {isHidden ? "Add new manufacturer" : "Cancel"}
          </Link>
          <div className={isHidden ? "hide" : "formShow"}>
            <h4>Create new manufacturer:</h4>
            <Input
              label="Manufacturer name"
              type="text"
              onChange={handleChange}
              disabled={localDisabled}
              name="newManufacturer"
              id="newManufacturer"
              error={errors.newManufacturer}
              ref={inputRef}
            />
            <Button
              disabled={localDisabled}
              className="mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              Add manufacturer
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManufacturerSelect;
