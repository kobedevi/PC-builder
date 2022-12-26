import React, { useCallback, useEffect, useRef, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import { axiosCreateOriginalGpu } from "../../../../core/modules/Gpu/api";

const schema = yup.object().shape({
  idManufacturer: yup.string().required(),
  modelName: yup.string().required(),
  vram: yup
    .number()
    .min(0, "Min. value 0, unit is GB.")
    .max(1024, "Max. value 1024, unit is GB.")
    .notRequired()
    .positive()
    .integer(),
  displayport: yup
    .number()
    .moreThan(-1, "Min. value is 0.")
    .max(10, "Max. value is 10")
    .notRequired()
    .integer(),
  hdmi: yup
    .number()
    .moreThan(-1, "Min. value is 0.")
    .max(10, "Max. value is 10")
    .notRequired()
    .integer(),
  vga: yup
    .number()
    .moreThan(-1, "Min. value is 0.")
    .max(10, "Max. value is 10")
    .notRequired()
    .integer(),
  dvi: yup
    .number()
    .moreThan(-1, "Min. value is 0.")
    .max(10, "Max. value is 10")
    .notRequired()
    .integer(),
});

const defaultData = {
  idManufacturer: "",
  modelName: "",
  vram: undefined,
  displayport: 0,
  hdmi: 0,
  vga: 0,
  dvi: 0,
};

const GpuOriginalForm = ({
  setInfo,
  errors,
  setErrors,
  toggleHide,
  initialData = {},
  setNewGpu,
  disabled,
  refresh,
  isLoading,
  setIsLoading,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });

  // const inputRef = useRef(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validate = useCallback(
    (data, onSuccess) => {
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
    },
    [setErrors]
  );

  useEffect(() => {
    if (isTouched) {
      validate(data);
    }
  }, [validate, isTouched, data]);

  const onSubmit = () => {
    axiosCreateOriginalGpu({
      ...data,
    })
      .then((e) => {
        setInfo(e.data);
        setNewGpu();
        setData({
          ...initialData,
        });
        this.forceUpdate();
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
    validate(data, () => onSubmit(data));
  };

  return (
    <>
      <ManufacturerSelect
        label="Manufacturer"
        name="idManufacturer"
        value={data.idManufacturer}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idManufacturer}
      />

      <Input
        label="Model name"
        type="text"
        name="modelName"
        value={data.modelName}
        disabled={disabled}
        onChange={handleChange}
        error={errors.modelName}
      />

      <NumberInput
        label="VRAM in GB"
        type="number"
        name="vram"
        value={data.vram}
        disabled={disabled}
        min={0}
        max={1024}
        step={1}
        onChange={handleChange}
        error={errors.vram}
        // ref={inputRef}
      />

      <div>
        <h3>Video outputs:</h3>

        <NumberInput
          label="Displayport outputs"
          type="number"
          name="displayport"
          value={data.displayport}
          disabled={disabled}
          min={0}
          max={10}
          step={1}
          onChange={handleChange}
          error={errors.displayport}
        />

        <NumberInput
          label="HDMI outputs"
          type="number"
          name="hdmi"
          value={data.hdmi}
          disabled={disabled}
          min={0}
          max={10}
          step={1}
          onChange={handleChange}
          error={errors.hdmi}
        />

        <NumberInput
          label="VGA outputs"
          type="number"
          name="vga"
          value={data.vga}
          disabled={disabled}
          min={0}
          max={10}
          step={1}
          onChange={handleChange}
          error={errors.vga}
        />

        <NumberInput
          label="DVI outputs"
          type="number"
          name="dvi"
          value={data.dvi}
          disabled={disabled}
          min={0}
          max={10}
          step={1}
          onChange={handleChange}
          error={errors.dvi}
        />
      </div>

      <Button
        className="mt-4"
        type="submit"
        disabled={disabled}
        onClick={handleSubmit}
      >
        {data._id ? "Update" : "Add original GPU"}
      </Button>
    </>
  );
};

export default GpuOriginalForm;
