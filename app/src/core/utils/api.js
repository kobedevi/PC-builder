import ApiError from "../error/ApiError";

const handleApiResult = async (res) => {
  // if (!res.ok) {
  //   const json = await res.json();
  //   throw new ApiError(json);
  // }
  // if (res.statusText === "OK") {
  //   console.log(res.data);
  //   return res.data[0];
  // }
  if (res.statusText !== "OK") {
    throw new ApiError(res);
  }
  return res.data;
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
