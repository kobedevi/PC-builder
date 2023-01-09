import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import CpuSocketSelect from "../../../util/CpuSocketSelect";
import FormfactorSelect from "../../../util/FormfactorSelect";
import Toggle from "../../../Design/Toggle";

const schema = yup.object().shape({
  idManufacturer: yup.string().required(),
  idCpuSocket: yup.string().required(),
  idFormfactor: yup.string().required(),
  modelName: yup.string().required(),
  wifi: yup.boolean().required(),
  memorySlots: yup.number().max(32).required().positive().integer(),
  sataPorts: yup.number().required().positive().integer(),
  pcieSlots: yup.number().max(8).required().positive().integer(),
});

const defaultData = {
  idManufacturer: "",
  idCpuSocket: "",
  idFormfactor: "",
  modelName: "",
  wifi: false,
  memorySlots: 4,
  sataPorts: 4,
  pcieSlots: 3,
};

const MotherboardForm = ({ onSubmit, initialData = {}, disabled }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "wifi") {
      setData({
        ...data,
        [e.target.name]: e.target.value === "true",
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
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

      <CpuSocketSelect
        label="Cpu Socket"
        name="idCpuSocket"
        value={data.idCpuSocket}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idCpuSocket}
      />

      <FormfactorSelect
        label="Formfactor"
        name="idFormfactor"
        value={data.idFormfactor}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idFormfactor}
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

      <Toggle
        label="Wifi"
        name="wifi"
        value={data.wifi}
        possibleValues={[false, true]}
        disabled={disabled}
        onChange={handleChange}
        error={errors.wifi}
      />

      <NumberInput
        label="Memory slots"
        type="number"
        name="memorySlots"
        value={data.memorySlots}
        disabled={disabled}
        min={"1"}
        max={"32"}
        step={1}
        onChange={handleChange}
        error={errors.memorySlots}
      />

      <NumberInput
        label="SATA ports"
        type="number"
        name="sataPorts"
        value={data.sataPorts}
        disabled={disabled}
        min={"0"}
        step={1}
        onChange={handleChange}
        error={errors.sataPorts}
      />

      <NumberInput
        label="PCIE slots"
        type="number"
        name="pcieSlots"
        value={data.pcieSlots}
        disabled={disabled}
        min={"0"}
        step={1}
        onChange={handleChange}
        error={errors.pcieSlots}
      />

      <Button className="mt-4" type="submit" disabled={disabled}>
        {data._id ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default MotherboardForm;
