import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updatePsu } from "../../../../core/modules/Psu/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import PsuForm from "../forms/PsuForm";
import { uploadImage } from "core/modules/Upload/api";

const PsuEdit = ({ psu, onUpdate }) => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [file, setFile] = useState()

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
    withAuth(updatePsu(data))
    .then((data) => {
      onUpdate(data);
      navigate(PossibleRoutes.Psus, { replace: true });
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }

  return (
    <>
      <h2>Edit Power supply</h2>
      {error && <ErrorAlert error={error} />}

      <PsuForm
        file={file}
        setFile={setFile}
        initialData={psu}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </>
  );
};

export default PsuEdit;
