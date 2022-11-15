import React, { useState } from 'react'
import { axiosCreateCpu, createCpu } from '../../../core/modules/CPU/api';
import ErrorAlert from '../../shared/ErrorAlert';
import CpuForm from './create/CpuForm';

const CreateCpu = () => {

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);
    axiosCreateCpu(data)
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    })
  }

  return (
    <div>
      <h2>Create Cpu</h2>
      <ErrorAlert error={error} />
      <CpuForm onSubmit={handleSubmit} disabled={isLoading} />
    </div>

    
  )
}

export default CreateCpu