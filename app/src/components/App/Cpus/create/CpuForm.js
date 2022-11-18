import React, {useCallback, useEffect, useState} from 'react'
import { getValidationErrors } from "../../../../core/utils/validation";
import * as yup from 'yup';
import Input from '../../../Design/Input';
import Button from '../../../Design/Button';
import NumberInput from '../../../Design/NumberInput';
import ManufacturerSelect from '../../../util/ManufacturerSelect';

const schema = yup.object().shape({
    manufacturerId: yup.string().required(),
    modelName: yup.string().required(),
    clockSpeed: yup.number().required().positive(),
    cores: yup.number().required().positive().integer(),
});

const defaultData = {
    manufacturerId: '',
    modelName: '',
    clockSpeed: 3.5,
    cores: 4
}

const CpuForm = ({onSubmit, initialData={}, disabled}) => {

  const [isTouched, setIsTouched] = useState(false);
  const [data, setData] = useState({
    ...defaultData,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({
       ...data,
       [e.target.name]: e.target.value
    })
  }

  const validate = useCallback((data, onSuccess) => {
    schema.validate(data, {abortEarly: false})
    .then(() => {
      if(onSuccess) {
        onSuccess();
      }
    })
    .catch((err) => {
      setErrors(getValidationErrors(err));
    });
  }, []);

  useEffect(() => {
    if(isTouched) {
      validate(data);
    }
  }, [validate, isTouched, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);
    validate(data, () => onSubmit(data))
  }

  return (
    <form noValidate={true} onSubmit={handleSubmit}>
      
      <ManufacturerSelect
        label="Manufacturer"
        name="manufacturerId"
        value={data.manufacturerId}
        disabled={disabled}
        onChange={handleChange}
        error={errors.manufacturerId}
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
        step={.1}
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

      <Button className='mt-4' type="submit" disabled={disabled}>
        {data._id ? 'Update' : 'Create'}
      </Button>

    </form>
  )
}

export default CpuForm