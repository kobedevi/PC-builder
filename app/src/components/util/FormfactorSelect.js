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
import useAuthApi from "../../core/hooks/useAuthApi";

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
  { initialData = {}, onChange, name, value, label },
  props
) => {
  const [newFormfactor, setNewFormfactor] = useState("");
  const [localDisabled, setLocalDisabled] = useState(props.disabled);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });

  const withAuth = useAuthApi();

  const toggleHide = (e=null) => {
    if(e) {
      e.preventDefault();
    }
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

  const onSubmit = () => {
    setLocalDisabled(true);
    withAuth(
      createFormfactor({
        ...data,
      })
    )
      .then((e) => {
        setLocalDisabled(false);
        refresh();
        setInfo(e);
        toggleHide();
      })
      .catch((err) => {
        setErrors(err);
        setData({
          ...initialData,
        });
        setLocalDisabled(false);
      });
  };

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
    <div className="form-group">
      {isLoading && <Spinner />}
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info.message}</Alert>}
      {options && (
        <>
          <Select
            label={label}
            options={options}
            onChange={onChange}
            name={name}
            value={value}
            {...props}
          />
          <Link style={{ display: "inline-block" }} onClick={toggleHide}>
            {isHidden ? "Add new formfactor" : "Cancel"}
          </Link>

          <div className={isHidden ? "hide" : "formShow"}>
            <h4>Create a formfactor:</h4>

            <Input
              label="Formfactor name"
              type="text"
              name="formfactor"
              value={data.formfactor}
              disabled={localDisabled}
              onChange={handleChange}
              id="formfactor"
              error={errors.formfactor}
            />

            <NumberInput
              label="Height"
              unit={"mm"}
              type="number"
              name="height"
              value={data.height}
              disabled={localDisabled}
              min={1}
              max={1000}
              step={1}
              onChange={handleChange}
              error={errors.height}
            />

            <NumberInput
              label="Width"
              unit={"mm"}
              type="number"
              name="width"
              value={data.width}
              disabled={localDisabled}
              min={1}
              max={1000}
              step={1}
              onChange={handleChange}
              error={errors.width}
            />

            <Button
              disabled={localDisabled}
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
