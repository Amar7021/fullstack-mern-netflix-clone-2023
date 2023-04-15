import { useState, useRef } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async e => {
    e.preventDefault();
    try {
      await axios.post("https://netflix-server-9afl.onrender.com/api/auth/register", {
        email,
        username,
        password,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

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
            <div className="input">
              <input type="email" placeholder="Email address" ref={emailRef} />
              <button className="registerButton" onClick={handleStart}>
                Get Started
              </button>
            </div>
          ) : (
            <form className="input">
              <input
                type="username"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
              // style={{ padding: "8px" }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                style={{ padding: "8px" }}
              />
              <button className="registerButton" onClick={handleFinish}>
                Start
              </button>
            </form>
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
