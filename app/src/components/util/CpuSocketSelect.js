import { useState, useEffect, useCallback, useRef } from "react";
import Select from "../Design/Select";
import {
  createCpuSocket,
  fetchCpuSockets,
} from "../../core/modules/CpuSocket/api";
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
  socketType: yup.string().required(),
});

const CpuSocketSelect = (props) => {
  const inputRef = useRef(null);
  const withAuth = useAuthApi();

  const [localDisabled, setLocalDisabled] = useState(props.disabled);
  const [newSocket, setNewSocket] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchCpuSockets();
  }, []);

  const {
    data: socketTypes,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(apiCall);

  const options = socketTypes
    ? socketTypes.map((s) => ({
        value: s.idCpuSocket,
        label: s.socketType,
      }))
    : null;

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setNewSocket({});
  };

  const validate = useCallback(async (newSocket, onSuccess) => {
    await schema
      .validate(newSocket, { abortEarly: false })
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
      validate(newSocket);
    }
  }, [validate, isTouched, newSocket]);

  const handleChange = (e) => {
    setNewSocket({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setLocalDisabled(true);
    withAuth(
      createCpuSocket({
        socketType: newSocket.socketType,
      })
    )
      .then((e) => {
        setLocalDisabled(false);
        refresh();
        setInfo(e);
        toggleHide();
        setNewSocket();
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
    validate(newSocket, () => onSubmit(newSocket)).then(() => {
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
            {isHidden ? "Add new socket type" : "Cancel"}
          </Link>
          <div className={isHidden ? "hide" : "formShow"}>
            <h4>Create new CPU socket:</h4>
            <Input
              label="socket name"
              type="text"
              disabled={localDisabled}
              onChange={handleChange}
              name="socketType"
              id="socketType"
              error={errors.socketType}
              ref={inputRef}
            />
            <Button
              disabled={localDisabled}
              className="mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              Add CPU socket
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CpuSocketSelect;
