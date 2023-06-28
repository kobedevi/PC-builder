import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import FormfactorSelect from "../../../util/FormfactorSelect";
import Toggle2 from "../../../Design/Toggle2";
import ToggleDefaultTrue from "../../../Design/ToggleDefaultTrue";

const schema = yup.object().shape({
  idManufacturer: yup.string().required(),
  idFormfactor: yup.string().required(),
  modelName: yup.string().required(),
  modular: yup.boolean().required(),
  wattage: yup.number().min(100).max(2500).required().positive().integer(),
  height: yup.number().min(1).max(1000).notRequired().positive().integer(),
  width: yup.number().min(1).max(1000).notRequired().positive().integer(),
  depth: yup.number().min(1).max(1000).notRequired().positive().integer(),
});

const defaultData = {
  idManufacturer: "",
  idFormfactor: "",
  modelName: "",
  modular: true,
  wattage: 550,
  height: 85,
  width: 150,
  depth: 140,
};

const PsuForm = ({ file, setFile, onSubmit, initialData = {}, disabled }) => {
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

      <Input
        label="Model name"
        type="text"
        name="modelName"
        value={data.modelName}
        disabled={disabled}
        onChange={handleChange}
        error={errors.modelName}
      />

      <ToggleDefaultTrue
        label="Is modular"
        name="modular"
        value={data.modular}
        possibleValues={[false, true]}
        disabled={disabled}
        onChange={handleChange}
        error={errors.modular}
      />

      <FormfactorSelect
        label="Formfactor"
        name="idFormfactor"
        value={data.idFormfactor}
        disabled={disabled}
        onChange={handleChange}
        error={errors.idFormfactor}
      />

      <NumberInput
        label="Wattage"
        type="number"
        name="wattage"
        value={data.wattage}
        disabled={disabled}
        min={100}
        max={2500}
        step={50}
        onChange={handleChange}
        error={errors.wattage}
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
        unit={"mm"}
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
        unit={"mm"}
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
        unit={"mm"}
        onChange={handleChange}
        error={errors.depth}
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
        {data.idPsu ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default PsuForm;
