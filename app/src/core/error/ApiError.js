class ApiError extends Error {
  constructor(err) {
    super();
    if (err && err.response.data.message && err.response.status) {
      this.message = `${err.response.status}: ${err.response.data.message}`;
      this.statusCode = err.response.status;
    } else if (err && err.message && err.response.status) {
      this.message = `${err.message}`;
      this.statusCode = err.response.status;
    } else {
      this.message = "Something went wrong";
      this.statusCode = 500;
    }
  }

  toString() {
    return this.message;
  }

  isUnauthorized() {
    return this.statusCode === 401;
  }
}

export default ApiError;
