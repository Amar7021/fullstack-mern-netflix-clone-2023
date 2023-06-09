import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToMyList } from "../../redux/features/myListSlice";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  // Add to My List
  const handleAddToList = movie => {
    dispatch(addToMyList(movie));
  };

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie?.imgSm} alt="" />
      {isHovered && (
        <>
          <video src={movie?.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <Link to="/watch" state={{ movie }} className="playLink">
                <div className="play">
                  <PlayArrow className="playIcon" />
                  <p className="playContent">Play</p>
                </div>
              </Link>
              <div className="add">
                <Add
                  className="addIcon"
                  onClick={() => handleAddToList(movie)}
                />
                <p className="addtoList">Add to My List</p>
              </div>

              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie?.duration}</span>
              <span className="limit">+{movie?.limit}</span>
              <span>{movie?.year}</span>
            </div>
            <div className="desc">{movie?.desc.slice(0, 140) + "..."}</div>
            <div className="genre">
              {movie?.genre.charAt(0).toUpperCase() + movie?.genre.slice(1)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
