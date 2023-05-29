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
  idFormfactor: yup.string().required(),
  modelName: yup.string().required(),
  height: yup.number().notRequired().positive().integer(),
  width: yup.number().notRequired().positive().integer(),
  depth: yup.number().notRequired().positive().integer(),
  smallBay: yup.number().moreThan(-1).notRequired().integer(),
  largeBay: yup.number().moreThan(-1).notRequired().integer(),
});

const defaultData = {
  idManufacturer: "",
  idFormfactor: "",
  modelName: "",
  height: undefined,
  width: undefined,
  depth: undefined,
  smallBay: 0,
  largeBay: 0,
};

const CaseForm = ({ file, setFile, onSubmit, initialData = {}, disabled }) => {

  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
    smallBay: initialData?.['2-5_slots'],
    largeBay: initialData?.['3-5_slots']
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

      <NumberInput
        label='2.5" bays'
        type="number"
        name="smallBay"
        value={data.smallBay}
        disabled={disabled}
        min={"1"}
        max={"1000"}
        step={1}
        onChange={handleChange}
        error={errors.smallBay}
      />

      <NumberInput
        label='3.5" bays'
        type="number"
        name="largeBay"
        value={data.largeBay}
        disabled={disabled}
        min={"1"}
        max={"1000"}
        step={1}
        onChange={handleChange}
        error={errors.largeBay}
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
        {data.idCase ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default CaseForm;
