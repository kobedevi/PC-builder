import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createRam } from "../../../../core/modules/Ram/api";
import { PossibleRoutes } from "../../../../core/routing";
import Spinner from "../../../Design/Spinner";
import ErrorAlert from "../../../shared/ErrorAlert";
import RamForm from "../forms/RamForm";
import { uploadImage } from "core/modules/Upload/api";

const CreateRam = () => {
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
        creater(data);
      })
    }
    else {
      creater(data)
    }
  };

  const creater = (data) => {
    withAuth(createRam(data))
    .then(() => {
      navigate(PossibleRoutes.Ram, { replace: true });
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <div>
      <h2>Create Ram</h2>
      <RamForm file={file} setFile={setFile} onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateRam;
