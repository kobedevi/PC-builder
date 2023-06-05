import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updateCase } from "../../../../core/modules/Case/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import CaseForm from "../forms/CaseForm";
import { uploadImage } from "core/modules/Upload/api";

const CaseEdit = ({ pccase, onUpdate }) => {
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
    withAuth(updateCase(data))
    .then((data) => {
      onUpdate(data);
      navigate(PossibleRoutes.Cases, { replace: true });
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }

  return (
    <>
      <h2>Edit Case</h2>
      {error && <ErrorAlert error={error} />}
      
      <CaseForm
        file = {file}
        setFile = {setFile}
        initialData={pccase}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </>
  );
};

export default CaseEdit;
