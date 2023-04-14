import "./watch.scss";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const movie = location.state.movie;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie.video}
      />
    </div>
  );
};
export default Watch;
