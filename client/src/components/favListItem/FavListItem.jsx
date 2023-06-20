import {
  Check,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { removeFromMyList } from "../../redux/features/myListSlice";
import { useDispatch } from "react-redux";
import video from "../../assets/video.mp4";
import "./favListItem.scss";
import { useState } from "react";

const FavListItem = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  // Remove from My List
  const handleRemoveFromList = myListItemId => {
    dispatch(removeFromMyList(myListItemId));
  };

  return (
    <div
      className="favListItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie?.imgSm} alt="" />
      {isHovered && (
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
              <div className="remove">
                <Check
                  className="removeIcon"
                  onClick={() => handleRemoveFromList(movie)}
                />
                <p className="removeFromList">Remove from My List</p>
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
        </div>
      )}
    </div>
  );
};

export default FavListItem;
