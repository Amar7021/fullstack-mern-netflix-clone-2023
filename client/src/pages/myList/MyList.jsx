import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./myList.scss";
import { Favorite } from "@mui/icons-material";
import FavListItem from "../../components/favListItem/FavListItem";
import ConfirmModal from "../../components/modal/confirmModal/ConfirmModal";

const MyList = () => {
  const { movies } = useSelector(state => state?.myLists);
  // const dispatch = useDispatch();
  // const [disable, setDisable] = useState(false);

  // Clear from My List
  // const handleClearList = () => {
  //   // dispatch(clearAllFromMyList());
  //   setOpen(true);
  //   setDisable(!disable);
  // };

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
          {/* <Button
            className="clearBtn"
            onClick={() => setOpen(true)}
            // disabled={disable}
          >
            Clear All
          </Button> */}
          <ConfirmModal />
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
