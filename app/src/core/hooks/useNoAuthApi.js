import { useCallback } from "react";
import ApiError from "../error/ApiError";
import AppError from "../error/AppError";
import { handleApiResult } from "../utils/api";

const useNoAuthApi = () => {

  const withNoAuth = useCallback((promise) => {
    return new Promise((resolve, reject) => {
      promise
        .then(handleApiResult)
        .then((data) => resolve(data))
        .catch((err) => {
          let e;
          if (err.response.status >= 400) {
            e = new ApiError(err);
          }
          if (e instanceof ApiError) {
            if (e.isUnauthorized()) {
              return;
            } else {
              reject(err);
            }
          } else {
            reject(new AppError(err));
          }
        });
    });
  }, []);

  return withNoAuth;
};

export default useNoAuthApi;
