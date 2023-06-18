import { useDispatch } from "react-redux";
import "./myListModal.scss";
import { clearAllFromMyList } from "../../../redux/features/myListSlice";
import { closeModal } from "../../../redux/features/modalSlice";

const MyListModal = ({ onClose }) => {
  const dispatch = useDispatch();

  // Clear from My List
  const handleClearList = () => {
    dispatch(clearAllFromMyList());
    dispatch(closeModal());
  };

  return (
    <>
      <div className="modalWrapper" onClick={onClose}>
        {" "}
      </div>
      <div className="modalContainer">
        <h3 className="modalHeading">Clear My List?</h3>
        <p>Are you sure you want to clear your favourite list?</p>
        <div className="confirmModal">
          <button onClick={handleClearList} className="confirmBtn">
            Ok
          </button>
          <button onClick={onClose} className="clearBtn">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MyListModal;
