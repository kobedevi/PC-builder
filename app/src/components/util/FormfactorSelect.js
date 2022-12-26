import { useState, useEffect, useCallback, useRef } from "react";
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

const schema = yup.object().shape({
  formfactor: yup.string().required(),
});

const FormfactorSelect = (props) => {
  const inputRef = useRef(null);

  const [newFormfactor, setNewFormfactor] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();

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

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setNewFormfactor({});
  };

  const validate = useCallback(async (newFormfactor, onSuccess) => {
    await schema
      .validate(newFormfactor, { abortEarly: false })
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
      validate(newFormfactor);
    }
  }, [validate, isTouched, newFormfactor]);

  const handleChange = (e) => {
    setNewFormfactor({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    createFormfactor({
      formfactor: newFormfactor.formfactor,
    })
      .then((e) => {
        setInfo(e);
        setNewFormfactor();
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
    validate(newFormfactor, () => onSubmit(newFormfactor));
  };

  return (
    <div>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info.message}</Alert>}
      {isLoading && <Spinner />}
      {options && (
        <>
          <Select options={options} {...props} />
          <Link style={{ display: "inline-block" }} onClick={toggleHide}>
            {isHidden ? "Add new formfactor" : "Cancel"}
          </Link>
          <div className={isHidden ? "hide" : "show"}>
            <Input
              label="formfactor name"
              type="text"
              disabled={props.disabled}
              onChange={handleChange}
              name="formfactor"
              id="formfactor"
              error={errors.formfactor}
              ref={inputRef}
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
