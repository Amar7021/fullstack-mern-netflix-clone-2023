import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  Check,
} from "@mui/icons-material";
import { useState, useEffect, memo } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToMyList,
  removeFromMyList,
} from "../../redux/features/myListSlice";
import video from "../../assets/video.mp4";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListItem = memo(({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
        return res;
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  // Add to My List
  const handleAddToList = movie => {
    setIsAdded(p => !p);
    dispatch(addToMyList(movie));
  };

  // Remove from My List
  const handleRemoveFromList = movie => {
    setIsAdded(p => !p);
    dispatch(removeFromMyList(movie));
  };

  return (
    <div
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <Skeleton width={225} height={120} />
      ) : (
        <img src={movie?.imgSm} alt="" />
      )}
      {isLoading
        ? null
        : isHovered && (
            <div className="hover">
              <div className="videoContainer">
                <img src={movie?.imgSm} alt="" />
                <video src={video} autoPlay={true} loop />
              </div>
              <div className="itemInfo">
                <div className="icons">
                  <Link to="/watch" state={{ movie }} className="playLink">
                    <div className="play">
                      <PlayArrow className="playIcon" />
                      <p className="playContent">Play</p>
                    </div>
                  </Link>
                  {!isAdded ? (
                    <div className="add">
                      <Add
                        className="addIcon"
                        onClick={() => handleAddToList(movie)}
                      />
                      <p className="addtoList">Add to My List</p>
                    </div>
                  ) : (
                    <div className="remove">
                      <Check
                        className="removeIcon"
                        onClick={() => handleRemoveFromList(movie)}
                      />
                      <p className="removeFromList">Remove from My List</p>
                    </div>
                  )}
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
            </div>
          )}
    </div>
  );
});

export default ListItem;
