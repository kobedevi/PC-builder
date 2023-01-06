import Axios from "axios";

const login = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/login`, {
    ...data,
  });
};

export { login };
