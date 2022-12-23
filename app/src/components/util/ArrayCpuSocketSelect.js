import { useState, useEffect, useCallback, useRef } from "react";
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
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  socketType: yup.string().required(),
});

const ArrayCpuSocketSelect = ({
  cpuSockets,
  setCpuSockets,
  label,
  name,
  disabled,
  handleChange: handleSocketChange,
  setData,
  data: formData,
  error: formError,
}) => {
  const inputRef = useRef(null);

  const [newSocket, setNewSocket] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchCpuSockets();
  }, []);

  useEffect(() => {
    setData({
      ...formData,
      cpuSockets: [...cpuSockets],
    });
  }, [cpuSockets]);

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
      {label && <label htmlFor={name}>{label}:</label>}
      {error && <Alert color="danger">{error.message}</Alert>}
      {formError && <Alert color="danger">{formError.message}</Alert>}
      {info && <Alert color="info">{info.message}</Alert>}

      {/* Code from Ben Awad
      https://www.youtube.com/watch?v=3GtAE9RZHVc */}
      {cpuSockets.map((c, index) => {
        return (
          <div key={c.tempId}>
            <select
              disabled={disabled}
              name={name}
              onChange={(e) => {
                const socketType = e.target.value;
                setCpuSockets((currentCpuSockets) =>
                  produce(currentCpuSockets, (v) => {
                    v[index].idCpuSocket = socketType;
                  })
                );
              }}
            >
              <option>--</option>
              {options &&
                options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>

            {/* TODO: Errors toevoegen en types controleren */}
            {/* <CpuSocketSelect
              label="Cpu Socket"
              name="idCpuSocket"
              value={data[tester].idCpuSocket}
              disabled={disabled}
              onChange={handleChange}
              error={errors.idCpuSocket}
            /> */}

            <button
              disabled={disabled}
              onClick={() => {
                setCpuSockets((currentCpuSockets) =>
                  currentCpuSockets.filter(
                    (x) => x.idCpuSocket !== c.idCpuSocket
                  )
                );
              }}
            >
              x
            </button>
          </div>
        );
      })}

      <Link style={{ display: "inline-block" }} onClick={toggleHide}>
        {isHidden ? "Add new socket type" : "Cancel"}
      </Link>
      <div className={isHidden ? "hide" : "show"}>
        <Input
          label="socket name"
          type="text"
          disabled={disabled}
          onChange={handleChange}
          name="socketType"
          id="socketType"
          error={errors.socketType}
          ref={inputRef}
        />
        <Button className="mt-4" type="submit" onClick={handleSubmit}>
          Add CPU socket
        </Button>
      </div>
      <br />
      <br />

      <button
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          setCpuSockets((currentCpuSockets) => [
            ...currentCpuSockets,
            {
              tempId: uuidv4(),
              idCpuSocket: "",
            },
          ]);
        }}
      >
        add compatible CPU socket
      </button>
    </div>
  );
};

export default ArrayCpuSocketSelect;
