import { useState, useRef } from "react";
import "./register.scss";
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { toast } from "react-toastify";

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
      await axios.post("/auth/register", {
        email,
        username,
        password,
      }
      );
      toast.success("🦄 Registration Successfull!", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
        }
        );
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
              />
              <input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
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