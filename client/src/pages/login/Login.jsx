import { useContext } from "react";
import { loginCall } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.scss";
import { LoginOutlined } from "@mui/icons-material";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .max(20, "Password must be less than 20 characters!")
    .required("Password is required!"),
});

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const onSubmit = values => {
    const { email, password } = values;
    loginCall({ email, password }, dispatch);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <Link to="/">
            <img
              className="logo"
              title="Netflix Logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png"
              alt="Netflix logo"
            />
          </Link>
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            name="email"
            type="email"
            placeholder="Email or phone number"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          <div className="emailError">
            {errors.email && touched.email ? (
              <p className="error">{errors.email}</p>
            ) : null}
          </div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          <div className="emailError">
            {errors.password && touched.password ? (
              <p className="error">{errors.password}</p>
            ) : null}
          </div>
          <button className="loginButton" type="submit" disabled={!isValid}>
            <LoginOutlined fontSize="small" className="loginIcon" />
            <span>Sign In</span>
          </button>
          <span>
            New to Netflix?{" "}
            <Link to="/register" className="signUpLink">
              Sign up now
            </Link>
            .
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a
              href="https://www.google.com/recaptcha/about/"
              target="_blank"
              rel="noreferrer"
            >
              Learn more.
            </a>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
