import Axios from "axios";
import { createHeaders } from "../../utils/api";

const login = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/login`, {
    ...data,
  });
};

export { login };
