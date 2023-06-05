import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updateCpu } from "../../../../core/modules/CPU/api";
import { PossibleRoutes } from "../../../../core/routing";
import { uploadImage } from "../../../../core/modules/Upload/api";
import ErrorAlert from "../../../shared/ErrorAlert";
import CpuForm from "../forms/CpuForm";

const CpuEdit = ({ cpu, onUpdate }) => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
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
  }

  const updater = (data) => {
    if(file === null){
      data.image = null;
    }
    withAuth(updateCpu(data))
    .then((data) => {
      onUpdate(data);
      navigate(PossibleRoutes.Cpus, { replace: true });
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }

  return (
    <>
      <h2>Edit CPU</h2>
      {error && <ErrorAlert error={error} />}

      <CpuForm file={file} setFile={setFile} initialData={cpu} onSubmit={handleSubmit} disabled={isLoading} />
    </>
  );
};

export default CpuEdit;
