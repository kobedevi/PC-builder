import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updateOriginalGpu } from "../../../../core/modules/Gpu/api";
import { updatePartnerGpu } from "../../../../core/modules/Gpu/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import GpuOriginalForm from "../forms/GpuOriginalForm";
import GpuForm from "../forms/GpuForm";
import { uploadImage } from "core/modules/Upload/api";

const GpuEdit = ({ gpu, onUpdate }) => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const [newGpu, setNewGpu] = useState("");
  const [info, setInfo] = useState();
  const [file, setFile] = useState();



  const handleSubmit = (data) => {
    setIsLoading(true);
    if(file) {
      const formData = new FormData();
      formData.append('file', file);
  
      // File upload
      const fileUpload = new Promise(async (resolve, reject) => {
        // await uploadImage(formData, data, user)
        withAuth(uploadImage(formData))
        .then((data) => {
            resolve(data.link);
        })
        .catch((err) =>{
            reject(err);
        })
      });
  
      fileUpload
      .then((link) => {
        data.image = link
        updater(data)
      });
    }
    else {
      updater(data)
    }
  };

  const updater = (data) => {
    if(file === null){
      data.image = null;
    }
    withAuth(gpu?.idGpuPartner ? updatePartnerGpu(data) : updateOriginalGpu(data))
    .then((data) => {
      onUpdate(data);
      navigate(PossibleRoutes.Gpus, { replace: true });
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }

  const toggleHide = () => {};
  const refresh = () => {};

  return (
    <>

    {
      gpu?.idGpuPartner && (
        <>
          <h2>Edit Partner GPU</h2>
          {error && <ErrorAlert error={error} />}
          <GpuForm file={file} setFile={setFile} initialData={gpu} onSubmit={handleSubmit} disabled={isLoading} />
        </>
      )
    }

    {
      !gpu?.idGpuPartner && (
        <>
          <h2>Edit Original GPU</h2>
          {error && <ErrorAlert error={error} />}
          <GpuOriginalForm
            initialData={gpu} 
            onUpdate={handleSubmit} 
            setInfo={setInfo}
            errors={error}
            setErrors={setError}
            toggleHide={toggleHide}
            setNewGpu={setNewGpu}
            refresh={refresh}
            disabled={isLoading}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </>
      )
    }
    </>
  );
};

export default GpuEdit;
