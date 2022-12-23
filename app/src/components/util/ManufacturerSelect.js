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

const schema = yup.object().shape({
  newManufacturer: yup.string().required(),
});

const ManufacturerSelect = (props) => {
  const inputRef = useRef(null);

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
    createManufacturer({
      manufacturerName: newManuName.newManufacturer,
    })
      .then((e) => {
        setInfo(e);
        setNewManuName();
        inputRef.current.value = "";
        toggleHide();
        refresh();
      })
      .catch((err) => {
        setErrors(err);
        setIsLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);
    validate(newManuName, () => onSubmit(newManuName));
  };

  return (
    <div>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info.message}</Alert>}
      <Select options={options} {...props} />
      <Link style={{ display: "inline-block" }} onClick={toggleHide}>
        {isHidden ? "Add new manufacturer" : "Cancel"}
      </Link>
      <div className={isHidden ? "hide" : "show"}>
        <Input
          label="Manufacturer name"
          type="text"
          onChange={handleChange}
          disabled={props.disabled}
          name="newManufacturer"
          id="newManufacturer"
          error={errors.newManufacturer}
          ref={inputRef}
        />
        <Button
          disabled={props.disabled}
          className="mt-4"
          type="submit"
          onClick={handleSubmit}
        >
          Add manufacturer
        </Button>
      </div>
    </div>
  );
};

export default ManufacturerSelect;
