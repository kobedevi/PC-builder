const getValidationErrors = (error) => {
  console.log(error);
  return error.inner.reduce(
    (obj, e) => ({
      ...obj,
      [e.path]: e.message,
    }),
    {}
  );
};

export { getValidationErrors };
