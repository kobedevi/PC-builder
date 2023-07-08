import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updateMotherboard } from "../../../../core/modules/Motherboard/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import MotherboardForm from "../forms/MotherboardForm";
import { uploadImage } from "core/modules/Upload/api";

const MotherboardEdit = ({ motherboard, onUpdate }) => {
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
    withAuth(updateMotherboard(data))
    .then(() => {
      navigate(PossibleRoutes.Motherboards, { replace: true });
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }

  return (
    <>
      <h2>Edit Motherboard</h2>
      {error && <ErrorAlert error={error} />}

      <MotherboardForm
        file={file} 
        setFile={setFile} 
        initialData={motherboard}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </>
  );
};

export default MotherboardEdit;
