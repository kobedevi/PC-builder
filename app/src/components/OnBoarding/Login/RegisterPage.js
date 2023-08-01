import { useState } from "react";
import Button from "../../Design/Button";
import Input from "../../Design/Input";
import Styles from "./LoginPage.module.scss";
import * as yup from "yup";
import { getValidationErrors } from "../../../core/utils/validation";
import ApiError from "../../../core/error/ApiError";
import AppError from "../../../core/error/AppError";
import { register } from "../../../core/modules/Auth/api";
import { handleApiResult } from "../../../core/utils/api";
import ErrorAlert from "../../shared/ErrorAlert";
import { Link } from "react-router-dom";
import { PossibleRoutes } from "core/routing";

let schema = yup.object().shape({
  userName: yup.string().required("Username is a required field"),
  email: yup.string().email().required(),
  password: yup.string().required().min(6, 'Password must be a minimum of 6 characters').max(32, 'Password must be a maximum of 32 characters'),
  repeatPassword: yup.string().required("Repeat password is a required field"),
});

const RegisterPage = ({ setUser }) => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        if(data.password === data.repeatPassword) {
          register(data)
          .then((res) => handleApiResult(res))
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            console.log(err);
            let e;
            if (err.response.status >= 400) {
              e = new ApiError(err);
            }
            if (e instanceof ApiError) {
              if (e.isUnauthorized()) {
                setError(new AppError("Wrong combination"));
              } else {
                setError(e);
              }
            } else {
              setError(new AppError(err));
            }
          });
        } else {
          setError(new AppError('Passwords do not match'));
        }
      })
      .catch((e) => {
        setErrors(getValidationErrors(e));
      });
  };

  return (
    <div className="middle">
      <div className="container">
        <div className="text-center">
          <h1 className="title mb-5">PC-BUILDER</h1>
          <form
            className={Styles["form-signin"]}
            onSubmit={handleSubmit}
            noValidate={true}
          >
            <h2 className="h3 mb-3 font-weight-normal">Please register</h2>
            <ErrorAlert error={error} />
            <Input
              label="Username"
              type="text"
              name="userName"
              value={data.userName}
              onChange={handleChange}
              error={errors.userName}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Input
              label="Repeat password"
              type="password"
              name="repeatPassword"
              value={data.repeatPassword}
              onChange={handleChange}
              error={errors.repeatPassword}
            />
            <div className="specialButton">
              <div className="btnContainer">
                <Button color="primary" type="submit">
                  Register
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-5 mb-3">
            <Link to={PossibleRoutes.Login} style={{textDecoration: "underline", color: "white"}}>Already have an account? <span style={{fontWeight: "bold"}}>Login!</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
