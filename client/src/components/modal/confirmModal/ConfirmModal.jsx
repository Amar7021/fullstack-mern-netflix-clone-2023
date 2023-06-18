import "./confirmModal.scss";
import { createPortal } from "react-dom";
import MyListModal from "./MyListModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../redux/features/modalSlice";
import { useState } from "react";

const ConfirmModal = () => {
  const { isOpen } = useSelector(state => state.modal);
  const { movies } = useSelector(state => state?.myLists);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const handleModal = () => {
    if (movies.length === 0) {
      setDisable(true);
    } else {
      dispatch(openModal());
    }
  };

  return (
    <>
      <button className="modalBtn" onClick={handleModal} disabled={disable}>
        Clear List
      </button>
      {isOpen &&
        createPortal(
          <MyListModal onClose={() => dispatch(closeModal())} />,
          document.body
        )}
    </>
  );
};

export default ConfirmModal;
