import ApiError from "../error/ApiError";

const handleApiResult = async (res) => {
  if (res.status >= 400) {
    throw new ApiError(res);
  }
  if (res.data) {
    return res.data;
  }
  return res;
};

const createHeaders = (extra = {}) => {
  return {
    "Content-Type": "application/json;charset=UTF-8",
    ...extra,
  };
};

const uploadHeaders = (extra = {}) => {
  return {
    'Content-Type': 'multipart/form-data',
    ...extra,
  };
};

const createAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

const withToken = (promise, token) => {
  return promise(createAuthHeader(token));
};

export { handleApiResult, createHeaders, uploadHeaders, withToken };
