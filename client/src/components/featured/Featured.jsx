import "./featured.scss";
import { PlayArrow } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Featured = ({ type, setGenre }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data[0]);
        setIsLoading(false);
        return res;
      } catch (err) {
        console.log(err);
      }
    };
    getRandomMovie();
  }, [type]);

  return (
    <div className="featured">
      {isLoading ? <Skeleton height={820} /> : null}
      {type && (
        <div className="category">
          <span className="featuredMovieType">
            {type === "movie" ? "Movies" : "TV Shows"}
          </span>
          <select
            name="genre"
            id="genre"
            onChange={e => setGenre(e.target.value)}
          >
            <option>All Genres</option>
            <option value="adventure">Adventure</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="thriller">Thriller</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={movie.img} alt="" className="featured-header" />
      <div className="info">
        <img src={movie.imgTitle} alt="" className="featured-title" />
        <span className="desc">{movie.desc}</span>
        <div className="buttons">
          <Link
            to="/watch"
            state={{ movie }}
            style={{ textDecoration: "none" }}
          >
            <button className="play">
              <PlayArrow className="playIcon" />
              <span>Play</span>
            </button>
          </Link>
          <span className="age-rating">{movie.limit}+</span>
        </div>
      </div>
    </div>
  );
};

export default Featured;
