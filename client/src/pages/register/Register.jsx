import { useState, useRef } from "react";
import "./register.scss";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address!")
    .required("Email is required!"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters!")
    .max(16, "Username must be less than 16 characters!")
    .required("Username is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .max(20, "Password must be less than 20 characters!")
    .required("Password is required!"),
});

const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const onSubmit = async values => {
    const { email, username, password } = values;
    try {
      await axios.post("/auth/register", {
        email,
        username,
        password,
      });
      toast.success("🦄 Registration Successfull!", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      navigate("/login");
    } catch (err) {
      toast.error("Email or Username is already in use!", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      console.log(err);
    }
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
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="register">
        <div className="top">
          <div className="wrapper">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png"
              alt="Netflix logo"
              className="logo"
            />
            <button onClick={goToLogin} className="loginButton">
              Sign In
            </button>
          </div>
        </div>
        <div className="container">
          <h1>Unlimited films, TV programmes and more.</h1>
          <h2>Watch anywhere. Cancel at any time.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          {!email ? (
            <>
              <div className="input">
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  ref={emailRef}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                <button className="registerButton" onClick={handleStart}>
                  Get Started
                </button>
              </div>
              <div className="registerError">
                {errors.email && touched.email ? (
                  <p className="error">{errors.email}</p>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <form className="input" onSubmit={handleSubmit}>
                <input
                  name="username"
                  type="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username ? "input-error" : ""
                  }
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                />
                <button
                  className="registerButton"
                  type="submit"
                  disabled={!isValid}
                >
                  Start
                </button>
              </form>
              <div className="registerError">
                {errors.username && touched.username ? (
                  <p className="error">{errors.username}</p>
                ) : null}
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="footerEnd">
        <Footer />
      </div>
    </>
  );
};

export default Register;
