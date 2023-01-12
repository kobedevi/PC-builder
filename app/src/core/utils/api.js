import ApiError from "../error/ApiError";

const handleApiResult = async (res) => {
  // console.log(res);
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
    "Content-type": "application/json",
    ...extra,
  };
};

const createAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

const withToken = (promise, token) => {
  return promise(createAuthHeader(token));
};

export { handleApiResult, createHeaders, withToken };
