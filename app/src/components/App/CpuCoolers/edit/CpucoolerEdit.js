import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { PossibleRoutes } from "../../../../core/routing";
import { updateCpuCooler } from "../../../../core/modules/CPUCooler/api";
import ErrorAlert from "../../../shared/ErrorAlert";
import CpuCoolerForm from "../forms/CpuCoolerForm";
import { uploadImage } from "core/modules/Upload/api";

const CpuCoolerEdit = ({ cooler, onUpdate }) => {
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
      
  };

  const updater = (data) => {
    if(file === null){
      data.image = null;
    }
    withAuth(updateCpuCooler(data))
    .then(() => {
      navigate(PossibleRoutes.CpuCoolers, { replace: true });
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }


  return (
    <>
      <h2>Edit CPU Cooler</h2>
      {error && <ErrorAlert error={error} />}
      <CpuCoolerForm
        file={file} 
        setFile={setFile}
        initialData={cooler}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </>
  );
};

export default CpuCoolerEdit;
