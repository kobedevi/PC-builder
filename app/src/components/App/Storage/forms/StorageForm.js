import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import StorageTypeSelect from "components/util/StorageTypeSelect";

const schema = yup.object().shape({
  modelName: yup.string().required(),
  capacity: yup.number().required().positive(),
  idManufacturer: yup.string().required(),
  idStorageType: yup.string().required(),
  RPM: yup.number().nullable().moreThan(0),
  image: yup.string().nullable(),
});

const defaultData = {
  modelName: "",
  capacity: 1000,
  idManufacturer: "",
  idStorageType: "",
  RPM: null,
  image: ""
};

const StorageForm = ({ file, setFile, onSubmit, initialData = {}, disabled }) => {
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
    if (e.target.name === "wifi") {
      setData({
        ...data,
        [e.target.name]: e.target.value === "true",
      });
    }
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
        label="Storage capacity"
        type="number"
        name="capacity"
        value={data.capacity}
        disabled={disabled}
        min={0}
        max={250000}
        step={1000}
        onChange={handleChange}
        unit={"GB"}
        error={errors.capacity}
      />

      <ManufacturerSelect
        label="Manufacturer"
        name="idManufacturer"
        value={data.idManufacturer}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idManufacturer}
      />

      <StorageTypeSelect
        label="Storage type"
        name="idStorageType"
        value={data.idStorageType}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idStorageType}
      />

      <NumberInput
        label="RPM"
        type="number"
        name="RPM"
        value={data.RPM}
        disabled={disabled}
        min={0}
        max={25000}
        step={1000}
        onChange={handleChange}
        error={errors.RPM}
      />

      <div>
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
        {data.idStorage ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default StorageForm;
