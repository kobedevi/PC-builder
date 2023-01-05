import { useState, useEffect, useCallback } from "react";
import Select from "../Design/Select";
import useFetch from "../../core/hooks/useFetch";
import Alert from "../Design/Alert";
import * as yup from "yup";
import { getValidationErrors } from "../../core/utils/validation";
import { Link } from "react-router-dom";
import Input from "../Design/Input";
import Button from "../Design/Button";
import {
  fetchFormfactors,
  createFormfactor,
} from "../../core/modules/Formfactor/api";
import Spinner from "../Design/Spinner";
import NumberInput from "../Design/NumberInput";

const schema = yup.object().shape({
  formfactor: yup.string().required(),
  height: yup.number().required().positive().integer(),
  width: yup.number().required().positive().integer(),
});

const defaultData = {
  formfactor: "",
  height: undefined,
  width: undefined,
};

const FormfactorSelect = (
  { initialData = {}, onChange, name, value },
  props
) => {
  const [newFormfactor, setNewFormfactor] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setNewFormfactor({});
  };

  const apiCall = useCallback(() => {
    return fetchFormfactors();
  }, []);

  const {
    data: formfactors,
    error,
    setError,
    isLoading,
    setIsLoading,
    refresh,
  } = useFetch(apiCall);

  const options = formfactors
    ? formfactors.map((formfactor) => ({
        value: formfactor.idFormfactor,
        label: formfactor.formfactor,
      }))
    : null;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    createFormfactor({
      ...data,
    })
      .then((e) => {
        setInfo(e);
        toggleHide();
        refresh();
        setIsLoading(true);
      })
      .catch((err) => {
        setErrors(err);
        setData({
          ...initialData,
        });
        setIsLoading(false);
      });
  };

  const validate = useCallback((data, onSuccess) => {
    schema
      .validate(data, { abortEarly: false })
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
      validate(data);
    }
  }, [validate, isTouched, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);
    validate(data, () => onSubmit(data)).then(() => {
      setIsTouched(false);
      setData({
        ...defaultData,
      });
    });
  };

  return (
    <div>
      {isLoading && <Spinner />}
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info.message}</Alert>}
      {options && (
        <>
          <Select
            options={options}
            onChange={onChange}
            name={name}
            value={value}
            {...props}
          />
          <Link style={{ display: "inline-block" }} onClick={toggleHide}>
            {isHidden ? "Add new formfactor" : "Cancel"}
          </Link>

          <div className={isHidden ? "hide" : "show"}>
            <h4>Create a formfactor:</h4>

            <Input
              label="Formfactor name"
              type="text"
              name="formfactor"
              value={data.formfactor}
              disabled={props.disabled}
              onChange={handleChange}
              id="formfactor"
              error={errors.formfactor}
            />

            <NumberInput
              label="Height in mm"
              type="number"
              name="height"
              value={data.height}
              disabled={props.disabled}
              min={1}
              max={1000}
              step={1}
              onChange={handleChange}
              error={errors.height}
            />

            <NumberInput
              label="Width in mm"
              type="number"
              name="width"
              value={data.width}
              disabled={props.disabled}
              min={1}
              max={1000}
              step={1}
              onChange={handleChange}
              error={errors.width}
            />

            <Button
              disabled={props.disabled}
              className="mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              Add formfactor
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FormfactorSelect;
