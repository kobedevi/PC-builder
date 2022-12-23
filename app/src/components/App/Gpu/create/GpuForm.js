import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import FormfactorSelect from "../../../util/FormfactorSelect";

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
    .min(0, "Min. value 0, unit is GB.")
    .max(1024, "Max. value 1024, unit is GB.")
    .notRequired()
    .positive()
    .integer(),
  hdmi: yup
    .number()
    .min(0, "Min. value 0, unit is GB.")
    .max(1024, "Max. value 1024, unit is GB.")
    .notRequired()
    .positive()
    .integer(),
  vga: yup
    .number()
    .min(0, "Min. value 0, unit is GB.")
    .max(1024, "Max. value 1024, unit is GB.")
    .notRequired()
    .positive()
    .integer(),
  dvi: yup
    .number()
    .min(0, "Min. value 0, unit is GB.")
    .max(1024, "Max. value 1024, unit is GB.")
    .notRequired()
    .positive()
    .integer(),
});

const defaultData = {
  idManufacturer: "",
  modelName: "",
  vram: undefined,
  displayport: undefined,
  hdmi: undefined,
  vga: undefined,
  dvi: undefined,
};

const GpuForm = ({ onSubmit, initialData = {}, disabled }) => {
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
      />

      <div>
        <h3>Video outputs:</h3>

        <NumberInput
          label="Displayport outputs"
          type="number"
          name="displayport"
          value={data.displayport}
          disabled={disabled}
          min={1}
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
          min={1}
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
          min={"1"}
          max={"1000"}
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
          min={"1"}
          max={"1000"}
          step={1}
          onChange={handleChange}
          error={errors.dvi}
        />
      </div>

      <Button className="mt-4" type="submit" disabled={disabled}>
        {data._id ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default GpuForm;
