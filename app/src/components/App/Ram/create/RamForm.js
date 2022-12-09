import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import Toggle2 from "../../../Design/Toggle2";

const schema = yup.object().shape({
  idManufacturer: yup.string().required(),
  modelName: yup.string().required(),
  sizePerStick: yup
    .number()
    .min(1, "Min. value 1, unit is GB.")
    .max(512, "Max. value 512, unit is GB.")
    .required()
    .positive()
    .integer(),
  stickAmount: yup
    .number()
    .min(1, "Min. Stick amount is 1.")
    .max(8, "Max. Stick amount is 8.")
    .required()
    .positive()
    .integer(),
  speed: yup
    .number()
    .min(1, "Min. speed amount is 1, unit is MHz.")
    .max(12000, "Max. speed amount is 12000, unit is MHz.")
    .required()
    .positive()
    .integer(),
  type: yup.string().oneOf(["DDR4", "DDR5"]).required(),
});

const defaultData = {
  idManufacturer: "",
  modelName: "",
  sizePerStick: 8,
  stickAmount: 2,
  speed: 3600,
  type: "DDR4",
};

const RamForm = ({ onSubmit, initialData = {}, disabled }) => {
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
        label="Size per stick"
        type="number"
        name="sizePerStick"
        value={data.sizePerStick}
        disabled={disabled}
        min={"1"}
        max={"512"}
        step={1}
        onChange={handleChange}
        error={errors.sizePerStick}
      />

      <NumberInput
        label="Stick amount"
        type="number"
        name="stickAmount"
        value={data.stickAmount}
        disabled={disabled}
        min={"1"}
        max={"8"}
        step={1}
        onChange={handleChange}
        error={errors.stickAmount}
      />

      <NumberInput
        label="Speed in MHz"
        type="number"
        name="speed"
        value={data.speed}
        disabled={disabled}
        min={"1"}
        max={"12000"}
        step={1}
        onChange={handleChange}
        error={errors.speed}
      />

      <Toggle2
        label="DIMM Type"
        name="type"
        value={data.type}
        possibleValues={["DDR4", "DDR5"]}
        disabled={disabled}
        onChange={handleChange}
        error={errors.type}
      />

      <Button className="mt-4" type="submit" disabled={disabled}>
        {data._id ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default RamForm;
