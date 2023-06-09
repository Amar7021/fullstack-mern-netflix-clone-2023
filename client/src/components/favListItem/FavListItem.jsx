import {
  Check,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { removeFromMyList } from "../../redux/features/myListSlice";
import { useDispatch, useSelector } from "react-redux";
import "./favListItem.scss";

const FavListItem = props => {
  const { movies } = useSelector(state => state?.myLists);
  const dispatch = useDispatch();

  // Remove from My List
  const handleRemoveFromList = myListItemId => {
    dispatch(removeFromMyList(myListItemId));
  };

  return (
    <div className="favListItem">
      {movies.map(movie => (
        <div className="listContainer" key={movie?._id}>
          <img src={movie?.imgSm} alt="" />
          <>
            <div className="movieItem">
              <video src={movie?.trailer} autoPlay={true} loop />
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
          </>
        </div>
      ))}
    </div>
  );
};

export default FavListItem;
