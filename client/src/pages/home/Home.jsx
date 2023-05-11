import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import "./home.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://netflix-server-9afl.onrender.com/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <>
      <div className="home">
        <Navbar />
        <Featured type={type} setGenre={setGenre} />
        {lists.map((list) => (
          <List list={list} key={list._id} />
        ))}
      </div>
      <div className="footerEnd">
        <Footer />
      </div>
    </>
  );
};

export default Home;
