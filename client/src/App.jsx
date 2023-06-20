import React, { useContext } from "react";
import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import MyList from "./pages/myList/MyList";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import NoMatch from "./components/noMatch/NoMatch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from "react-loading-skeleton";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <SkeletonTheme baseColor="#111" highlightColor="#333">
        <Router>
          <ToastContainer />
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="/register" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            {user && (
              <>
                <Route path="/movies" element={<Home type="movie" />} />
                <Route path="/series" element={<Home type="series" />} />
                <Route path="/mylist" element={<MyList />} />
                <Route path="/watch" element={<Watch />} />
              </>
            )}
            <Route path="*" element={<NoMatch />}></Route>
          </Routes>
        </Router>
      </SkeletonTheme>
    </>
  );
};

export default App;
