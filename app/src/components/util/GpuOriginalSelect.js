import { useState, useEffect, useCallback, useRef } from "react";
import Select from "../Design/Select";
import {
  axiosCreateOriginalGpu,
  fetchOriginalGpus,
} from "../../core/modules/Gpu/api";
import useFetch from "../../core/hooks/useFetch";
import Alert from "../Design/Alert";
import * as yup from "yup";
import { getValidationErrors } from "../../core/utils/validation";
import { Link } from "react-router-dom";
import Input from "../Design/Input";
import Button from "../Design/Button";
import GpuOriginalForm from "../App/Gpu/create/GpuOriginalForm";
import Spinner from "../Design/Spinner";

const schema = yup.object().shape({
  // socketType: yup.string().required(),
});

const GpuOriginalSelect = (props) => {
  // const inputRef = useRef(null);

  const [newGpu, setNewGpu] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  // const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchOriginalGpus();
  }, []);

  const { data, error, setError, isLoading, setIsLoading, refresh } =
    useFetch(apiCall);

  const options = data
    ? data.map((x) => ({
        value: x.idGpu,
        label: x.modelName,
      }))
    : null;

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setNewGpu({});
  };

  // const validate = useCallback(async (newSocket, onSuccess) => {
  //   await schema
  //     .validate(newSocket, { abortEarly: false })
  //     .then(() => {
  //       if (onSuccess) {
  //         onSuccess();
  //       }
  //     })
  //     .catch((err) => {
  //       setErrors(getValidationErrors(err));
  //     });
  // }, []);

  // useEffect(() => {
  //   if (isTouched) {
  //     validate(newSocket);
  //   }
  // }, [validate, isTouched, newSocket]);

  // const handleChange = (e) => {
  //   setNewSocket({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onSubmit = () => {
  //   axiosCreateOriginalGpu({
  //     socketType: newSocket.socketType,
  //   })
  //     .then((e) => {
  //       setInfo(e);
  //       setNewSocket();
  //       inputRef.current.value = "";
  //       toggleHide();
  //       refresh();
  //     })
  //     .catch((err) => {
  //       setErrors(err);
  //       setIsLoading(false);
  //     });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsTouched(true);
  //   validate(newSocket, () => onSubmit(newSocket));
  // };

  return (
    <div>
      {error && <Alert color="danger">{error.message}</Alert>}
      {errors.message && <Alert color="danger">{errors.message}</Alert>}
      {isLoading && <Spinner />}
      {options && (
        <>
          <Select options={options} {...props} />
          {info && <Alert color="info">{info.message}</Alert>}
          <Link style={{ display: "inline-block" }} onClick={toggleHide}>
            {isHidden ? "Add new original GPU" : "Cancel"}
          </Link>
          <div className={isHidden ? "hide" : "show"}>
            <GpuOriginalForm
              setInfo={setInfo}
              errors={errors}
              setErrors={setErrors}
              toggleHide={toggleHide}
              setNewGpu={setNewGpu}
              refresh={refresh}
              disabled={props.disabled}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GpuOriginalSelect;
