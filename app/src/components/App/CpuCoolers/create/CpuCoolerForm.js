import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import ArrayCpuSocketSelect from "../../../util/ArrayCpuSocketSelect";

const schema = yup.object().shape({
  idManufacturer: yup.string().required(),
  modelName: yup.string().required(),
  height: yup.number().notRequired().positive().integer(),
  width: yup.number().notRequired().positive().integer(),
  depth: yup.number().notRequired().positive().integer(),
  cpuSockets: yup.array().notRequired(),
});

const defaultData = {
  idManufacturer: "",
  modelName: "",
  height: undefined,
  width: undefined,
  depth: undefined,
  cpuSockets: [],
};

const CpuCoolerForm = ({ onSubmit, initialData = {}, disabled }) => {
  const [cpuSockets, setCpuSockets] = useState([{ idCpuSocket: "" }]);

  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(data);
    setData({
      ...data,
      cpuSockets: cpuSockets,
      [e.target.name]: e.target.value,
    });
  };

  const validate = useCallback((data, onSuccess) => {
    console.log(data);
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
        label="Height in cm"
        type="number"
        name="height"
        value={data.height}
        disabled={disabled}
        min={"1"}
        max={"1000"}
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
        min={"1"}
        max={"1000"}
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
        min={"1"}
        max={"1000"}
        step={1}
        onChange={handleChange}
        error={errors.depth}
      />

      <ArrayCpuSocketSelect
        label="Compatible CPU socket"
        name="cpuSockets"
        value={data.cpuSockets}
        cpuSockets={cpuSockets}
        setCpuSockets={setCpuSockets}
        setData={setData}
        data={data}
        error={errors.cpuSockets}
      />

      <Button className="mt-4" type="submit" disabled={disabled}>
        {data._id ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default CpuCoolerForm;
