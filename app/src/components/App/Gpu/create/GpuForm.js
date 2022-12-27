import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import GpuOriginalSelect from "../../../util/GpuOriginalSelect";
import Toggle from "../../../Design/Toggle2";

const schema = yup.object().shape({
  idGpu: yup.string().required(),
  idManufacturer: yup.string().required(),
  modelName: yup.string().required(),
  clockspeed: yup
    .number()
    .min(1, "Min. speed amount is 1, unit is MHz.")
    .max(99999, "Max. speed amount is 99999, unit is MHz.")
    .required()
    .positive(),
  watercooled: yup.boolean().required(),
  height: yup.number().notRequired().positive().integer(),
  width: yup.number().notRequired().positive().integer(),
  depth: yup.number().notRequired().positive().integer(),
  wattage: yup
    .number()
    .min(1, "Min. wattage amount is 1, unit is W.")
    .max(10000, "Max. wattage amount is 10000, unit is W.")
    .required()
    .positive(),
});

const defaultData = {
  idGpu: "",
  idManufacturer: "",
  modelName: "",
  clockspeed: 1440,
  watercooled: false,
  height: undefined,
  width: undefined,
  depth: undefined,
  wattage: undefined,
};

const GpuForm = ({ onSubmit, initialData = {}, disabled, setError }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);
    validate(data, () => onSubmit(data));
  };

  return (
    <form noValidate={true} onSubmit={handleSubmit}>
      <div className="form-parent">
        <GpuOriginalSelect
          label="Original GPU"
          name="idGpu"
          value={data.idGpu}
          disabled={disabled}
          onChange={handleChange}
          error={errors.idGpu}
        />

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
          label="Clock speed in MHz"
          type="number"
          name="clockspeed"
          value={data.clockspeed}
          disabled={disabled}
          min={0.1}
          max={99999}
          step={1}
          onChange={handleChange}
          error={errors.clockspeed}
        />

        <Toggle
          label="Is watercooled"
          name="watercooled"
          value={data.watercooled}
          possibleValues={[false, true]}
          disabled={disabled}
          onChange={handleChange}
          error={errors.watercooled}
        />

        <NumberInput
          label="Height in cm"
          type="number"
          name="height"
          value={data.height}
          disabled={disabled}
          min={1}
          max={1000}
          step={1}
          onChange={handleChange}
          error={errors.height}
        />

        <NumberInput
          label="Width in cm"
          type="number"
          name="width"
          value={data.width}
          disabled={disabled}
          min={1}
          max={1000}
          step={1}
          onChange={handleChange}
          error={errors.width}
        />

        <NumberInput
          label="Depth in cm"
          type="number"
          name="depth"
          value={data.depth}
          disabled={disabled}
          min={1}
          max={1000}
          step={1}
          onChange={handleChange}
          error={errors.depth}
        />

        <NumberInput
          label="Wattage"
          type="number"
          name="wattage"
          value={data.wattage}
          disabled={disabled}
          min={100}
          max={10000}
          step={50}
          onChange={handleChange}
          error={errors.wattage}
        />

        <Button className="mt-4" type="submit" disabled={disabled}>
          {data._id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default GpuForm;
