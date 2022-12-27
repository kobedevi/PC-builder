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

const GpuOriginalSelect = (props) => {
  const [newGpu, setNewGpu] = useState("");
  const [isHidden, setIsHidden] = useState(true);
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
            <h4>Create original GPU:</h4>
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
