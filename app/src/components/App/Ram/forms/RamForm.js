import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import RamTypeSelect from "components/util/RamTypeSelect";

const schema = yup.object().shape({
  idManufacturer: yup.string().required(),
  idRamType: yup.string().required(),
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
  price: yup.number().nullable().positive(),
});

const defaultData = {
  idManufacturer: "",
  idRamType: "",
  modelName: "",
  sizePerStick: 8,
  stickAmount: 2,
  speed: 3600,
  price: 100,
};

const RamForm = ({ file, setFile, onSubmit, initialData = {}, disabled }) => {
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
      <ManufacturerSelect
        label="Manufacturer"
        name="idManufacturer"
        value={data.idManufacturer}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idManufacturer}
      />

      <RamTypeSelect
        label="Ram type"
        name="idRamType"
        value={data.idRamType}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idRamType}
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
        unit={"GB"}
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
        label="Speed"
        type="number"
        name="speed"
        value={data.speed}
        disabled={disabled}
        min={"1"}
        max={"12000"}
        step={100}
        unit={"MHz"}
        onChange={handleChange}
        error={errors.speed}
      />

      <NumberInput
        label="MSRP price"
        type="number"
        name="price"
        value={data.price}
        disabled={disabled}
        min={"1"}
        step={1}
        onChange={handleChange}
        unit={'€'}
        error={errors.price}
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
            <div className="formImgPreview">
              <img alt="product preview" src={ file ? URL.createObjectURL(file) : (data.image)}/>
              <Button onClick={removeImage} color="danger">
                Remove image
              </Button>
            </div>
          )
        }
      </div>

      <Button className="mt-4" type="submit" disabled={disabled}>
        {data.idRam ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default RamForm;
