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

const schema = yup.object().shape({
  socketType: yup.string().required(),
});

const CpuSocketSelect = (props) => {
  const inputRef = useRef(null);

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
    setIsLoading,
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
    createCpuSocket({
      socketType: newSocket.socketType,
    })
      .then((e) => {
        setInfo(e);
        setNewSocket();
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
    validate(newSocket, () => onSubmit(newSocket));
  };

  return (
    <div>
      {error && <Alert color="danger">{error.message}</Alert>}
      {info && <Alert color="info">{info.message}</Alert>}
      <Select options={options} {...props} />
      <Link style={{ display: "inline-block" }} onClick={toggleHide}>
        {isHidden ? "Add new socket type" : "Cancel"}
      </Link>
      <div className={isHidden ? "hide" : "show"}>
        <Input
          label="socket name"
          type="text"
          disabled={props.disabled}
          onChange={handleChange}
          name="socketType"
          id="socketType"
          error={errors.socketType}
          ref={inputRef}
        />
        <Button
          disabled={props.disabled}
          className="mt-4"
          type="submit"
          onClick={handleSubmit}
        >
          Add CPU socket
        </Button>
      </div>
    </div>
  );
};

export default CpuSocketSelect;
