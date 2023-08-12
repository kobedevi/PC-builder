import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import CpuSocketSelect from "../../../util/CpuSocketSelect";

const schema = yup.object().shape({
  idManufacturer: yup.string().required(),
  idCpuSocket: yup.string().required(),
  modelName: yup.string().required(),
  clockSpeed: yup.number().required().positive(),
  cores: yup.number().required().positive().integer(),
  image: yup.string().nullable(),
  wattage: yup.number().required().positive().integer(),
  price: yup.number().nullable().positive(),
});

const defaultData = {
  idManufacturer: "",
  idCpuSocket: "",
  modelName: "",
  clockSpeed: 3.5,
  cores: 4,
  image: "",
  wattage: 100,
  price: 100,
};

const CpuForm = ({ file, setFile, onSubmit, initialData = {}, disabled }) => {
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

      <CpuSocketSelect
        label="Cpu Socket"
        name="idCpuSocket"
        value={data.idCpuSocket}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idCpuSocket}
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
        name="clockSpeed"
        value={data.clockSpeed}
        disabled={disabled}
        min={".1"}
        step={0.1}
        unit={'GHz'}
        onChange={handleChange}
        error={errors.clockSpeed}
      />

      <NumberInput
        label="Cores"
        type="number"
        name="cores"
        value={data.cores}
        disabled={disabled}
        min={"1"}
        step={1}
        onChange={handleChange}
        error={errors.cores}
      />

      <NumberInput
        label="TDP"
        type="number"
        name="wattage"
        value={data.wattage}
        disabled={disabled}
        min={"1"}
        step={1}
        onChange={handleChange}
        unit={'W'}
        error={errors.wattage}
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
        {data.idProcessor ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default CpuForm;
