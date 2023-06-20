import "./list.scss";
import {
  ArrowForwardIosOutlined,
  ArrowBackIosOutlined,
} from "@mui/icons-material";
import ListItem from "../listItem/ListItem";
import { useRef, useState } from "react";

const List = ({ list }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const listRef = useRef();

  const handleDirection = direction => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div
        className="wrapper"
        showControls={showControls}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div
          className="arrowWrapper left"
          style={{ display: !showControls && "none" }}
        >
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleDirection("left")}
          />
        </div>
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem item={item} key={i} />
          ))}
        </div>
        <div className="arrowWrapper right">
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleDirection("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
