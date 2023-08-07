import { useState, useCallback } from "react";
import Select from "../Design/Select";
import { fetchOriginalGpus } from "../../core/modules/Gpu/api";
import useFetch from "../../core/hooks/useFetch";
import Alert from "../Design/Alert";
import { Link } from "react-router-dom";
import GpuOriginalForm from "../App/Gpu/forms/GpuOriginalForm";
import Spinner from "../Design/Spinner";
import ErrorAlert from "../shared/ErrorAlert";

const GpuOriginalSelect = (props) => {
  const [newGpu, setNewGpu] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState({});
  const [info, setInfo] = useState();

  const apiCall = useCallback(() => {
    return fetchOriginalGpus();
  }, []);

  const {
    data,
    error: fetchError,
    isLoading,
    setIsLoading,
    refresh,
  } = useFetch(apiCall);

  const options = data
    ? data.results.map((x) => ({
        value: x.idGpu,
        label: x.modelName,
      }))
    : null;

  const toggleHide = () => {
    setIsHidden(!isHidden);
    setNewGpu({});
  };

  return (
    <div className="form-group">
      {isLoading && <Spinner />}

      {/* errors*/}
      {error.message && <ErrorAlert error={error} />}
      {fetchError && <Alert color="danger">{fetchError}</Alert>}

      {options && (
        <>
          <Select options={options} {...props} />
          {info && <Alert color="info">{info.message}</Alert>}
          <Link style={{ display: "inline-block" }} onClick={toggleHide}>
            {isHidden ? "Add new chipset" : "Cancel"}
          </Link>
          <div className={isHidden ? "hide" : "formShow"}>
            <h4>Create new chipset:</h4>
            <GpuOriginalForm
              setInfo={setInfo}
              errors={error}
              setErrors={setError}
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
