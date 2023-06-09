import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./myList.scss";
import { clearAllFromMyList } from "../../redux/features/myListSlice";
import { Favorite } from "@mui/icons-material";
import FavListItem from "../../components/favListItem/FavListItem";

const MyList = () => {
  const { movies } = useSelector(state => state?.myLists);
  const dispatch = useDispatch();

  // Clear from My List
  const handleClearList = () => {
    dispatch(clearAllFromMyList());
  };

  return (
    <div className="myList">
      <div className="topbar">
        <Navbar />
      </div>
      <div className="container">
        <div className="favContainer">
          <h2>
            <Favorite className="heartIcon" /> Your Favourites: {movies.length}
          </h2>
          <button className="clearBtn" onClick={() => handleClearList()}>
            Clear All
          </button>
        </div>
        {movies.length === 0 ? (
          <h2 className="subHeading">
            Add Something In Your List To Watch Later.
          </h2>
        ) : null}
        <div className="favlistItem">
          <FavListItem />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyList;
