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
    .min(1, "Min. speed amount is 1MHz.")
    .max(99999, "Max. speed amount is 99999MHz.")
    .required()
    .positive(),
  watercooled: yup.boolean().required(),
  height: yup.number().notRequired().positive().integer(),
  width: yup.number().notRequired().positive().integer(),
  depth: yup.number().notRequired().positive().integer(),
  tdp: yup
    .number()
    .min(1, "Min. TDP amount is 1W.")
    .max(10000, "Max. TDP amount is 10000W.")
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
  tdp: 200,
};

const GpuForm = ({file, setFile, onSubmit, initialData = {}, disabled }) => {
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
    if(e.target.name === 'image') {
      setFile(e.target.files[0]);
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

  const removeImage = (e) => {
    e.preventDefault();
    setFile(null);
    setData({
      ...data,
      image: null,
    });
  }

  return (
    <form noValidate={true} onSubmit={handleSubmit}>
      <div className="form-parent">
        <GpuOriginalSelect
          label="Chipset"
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
          label="Clock speed"
          type="number"
          name="clockspeed"
          value={data.clockspeed}
          disabled={disabled}
          min={0.1}
          max={99999}
          step={1}
          onChange={handleChange}
          unit={"MHz"}
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
          label="Height"
          type="number"
          name="height"
          value={data.height}
          disabled={disabled}
          min={1}
          max={1000}
          step={1}
          onChange={handleChange}
          unit={"cm"}
          error={errors.height}
        />

        <NumberInput
          label="Width"
          type="number"
          name="width"
          value={data.width}
          disabled={disabled}
          min={1}
          max={1000}
          step={1}
          unit={"cm"}
          onChange={handleChange}
          error={errors.width}
        />

        <NumberInput
          label="Depth"
          type="number"
          name="depth"
          value={data.depth}
          disabled={disabled}
          min={1}
          max={1000}
          step={1}
          unit={"cm"}
          onChange={handleChange}
          error={errors.depth}
        />

        <NumberInput
          label="TDP"
          type="number"
          name="tdp"
          value={data.tdp}
          disabled={disabled}
          min={100}
          max={10000}
          step={50}
          unit={"W"}
          onChange={handleChange}
          error={errors.tdp}
        />

        <div className="form-group">
          <Input
            label="Product image"
            type="file"
            name="image"
            accept='image/png, image/jpeg, image/jpg, image/gif'
            disabled={disabled}
            onChange={handleChange}
            error={errors.coverLink}
          />
          {
            data.image && (
              <>
                <img alt="product preview" src={ file ? URL.createObjectURL(file) : (data.image)}/>
                <Button onClick={removeImage} color="danger">
                  Remove image
                </Button>
              </>
            )
          }
        </div>

        <Button className="mt-4" type="submit" disabled={disabled}>
          {data.idGpuPartner ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default GpuForm;
