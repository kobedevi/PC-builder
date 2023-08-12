import React, { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from "yup";
import Input from "../../../Design/Input";
import Button from "../../../Design/Button";
import NumberInput from "../../../Design/NumberInput";
import ManufacturerSelect from "../../../util/ManufacturerSelect";
import ArrayCpuSocketSelect from "../../../util/ArrayCpuSocketSelect";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  idManufacturer: yup.string().required(),
  modelName: yup.string().required(),
  height: yup.number().notRequired().positive().integer(),
  width: yup.number().notRequired().positive().integer(),
  depth: yup.number().notRequired().positive().integer(),
  cpuSockets: yup.array().notRequired(),
  image: yup.string().nullable(),
  price: yup.number().nullable().positive(),
});

const defaultData = {
  idManufacturer: "",
  modelName: "",
  height: 0,
  width: 0,
  depth: 0,
  cpuSockets: [],
  image: "",
  price: 100,
};

const CpuCoolerForm = ({ file, setFile, onSubmit, initialData = { idCpuSocket: {} }, disabled }) => {


  const temp = [];
  useEffect(() => {
    // Update the document title using the browser API
    if (Object.keys(initialData.idCpuSocket).length > 0) {
      initialData.idCpuSocket.map((socket) => {
        const socketData = {
          idCpuSocket: socket,
          tempId: uuidv4(),
        };
        temp.push(socketData);
      });
    } else {
      temp.push({ idCpuSocket: "", tempId: uuidv4() });
    }
  });
  
  const [cpuSockets, setCpuSockets] = useState(temp);
  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
    cpuSockets: temp,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      cpuSockets: cpuSockets,
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
        unit={'mm'}
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
        onChange={handleChange}
        unit={'mm'}
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
        onChange={handleChange}
        unit={'mm'}
        error={errors.depth}
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
      <ArrayCpuSocketSelect
        label="Compatible CPU socket"
        name="cpuSockets"
        disabled={disabled}
        value={data.cpuSockets}
        cpuSockets={cpuSockets}
        setCpuSockets={setCpuSockets}
        setData={setData}
        data={data}
        error={errors.cpuSockets}
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
        {data.idCpuCooler ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default CpuCoolerForm;
