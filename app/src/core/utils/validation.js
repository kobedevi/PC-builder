const getValidationErrors = (error) => {
  return error.inner.reduce(
    (obj, e) => ({
      ...obj,
      [e.path]: e.message,
    }),
    {}
  );
};

export { getValidationErrors };
