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

const schema = yup.object().shape({
  newManufacturer: yup.string().required(),
});

const ManufacturerSelect = (props) => {
  const inputRef = useRef(null);

  const [newManuName, setNewManuName] = useState("");
  const [isHidden, setIsHidden] = useState(false);
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
    setIsLoading,
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
      .isValid(newManuName)
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
    createManufacturer({
      manufacturerName: newManuName.newManufacturer,
    })
      .then((e) => {
        setInfo(e.message);
        setNewManuName();
        inputRef.current.value = "";
        toggleHide();
        refresh();
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);
    validate(newManuName, () => onSubmit(newManuName));
  };

  return (
    <>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info}</Alert>}
      <Select options={options} {...props} />
      <p onClick={toggleHide}>
        Link that disables above field and lets you add a manufacturer
      </p>
      <div className={!isHidden ? "hide" : "show"}>
        <label name="newManufacturer" htmlFor="newManufacturer">
          Add Manufacturer to list:
        </label>
        <input
          onChange={handleChange}
          ref={inputRef}
          name="newManufacturer"
          id="newManufacturer"
          type="text"
        />
        <button type="submit" onClick={handleSubmit}>
          new name
        </button>
      </div>
    </>
  );
};

export default ManufacturerSelect;
