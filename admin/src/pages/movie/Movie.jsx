import { Link, useLocation } from "react-router-dom";
import "./movie.css";
import { useContext, useState } from "react";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import storage from "../../firebase";

const Movie = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  const [updatedMovie, setUpdatedMovie] = useState(movie);
  const [img, setImage] = useState(null);
  const [imgTitle, setImageTitle] = useState(null);
  const [imgSm, setImageSmall] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);

  const { dispatch } = useContext(MovieContext);

  const handleChange = e => {
    const value = e.target.value;
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateMovie(updatedMovie._id, updatedMovie, dispatch);
  };

  const upload = items => {
    items.forEach((item, key) => {
      if (item.file) {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById(`uploadProgress${[key]}`).textContent =
              `Upload ${key + 1} is ` + progress.toFixed(2) + `% done`;
          },
          err => {
            console.log(err);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
              setUpdatedMovie(prev => {
                return { ...prev, [item.label]: url };
              });
            });
          }
        );
      }
    });
  };

  const handleUpload = e => {
    e.preventDefault();
    upload([
      { file: img, label: "image" },
      { file: imgTitle, label: "imageTitle" },
      { file: imgSm, label: "imageSmall" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  return (
    <div className="movie">
      <div className="movieTitleContainer">
        <h1 className="movieTitle">Movie</h1>
        <Link to="/newmovie">
          <button className="movieAddButton">Create</button>
        </Link>
      </div>
      <div className="movieTop">
        <div className="movieTopRight">
          <div className="movieInfoTop">
            <img src={movie.img} alt="" className="movieInfoImg" />
            <span className="movieName">{movie.title}</span>
          </div>
          <div className="movieInfoBottom">
            <div className="movieInfoItem">
              <span className="movieInfoKey">Id:</span>
              <span className="movieInfoValue">{movie._id}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">Genre:</span>
              <span className="movieInfoValue">{movie.genre}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">Year:</span>
              <span className="movieInfoValue">{movie.year}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">Age Limit:</span>
              <span className="movieInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="movieBottom">
        <form className="movieForm">
          <div className="movieFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              name="title"
              onChange={handleChange}
            />
            <label>Description</label>
            <input
              type="text"
              placeholder={movie.desc}
              name="description"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              name="year"
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              name="genre"
              onChange={handleChange}
            />
            <label>Duration</label>
            <input
              type="text"
              placeholder={movie.duration}
              name="duration"
              onChange={handleChange}
            />
            <label>Age Limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              name="limit"
              onChange={handleChange}
            />
            <label>Is Series?</label>
            <select id="isSeries" name="isSeries" onChange={handleChange}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <label>Trailer</label>
            <input
              type="file"
              placeholder={movie.trailer}
              name="trailer"
              onChange={e => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              placeholder={movie.video}
              name="video"
              onChange={e => setVideo(e.target.files[0])}
            />
          </div>
          <div className="movieFormRight">
            <div className="movieUpload">
              <img src={movie.img} alt="" className="movieUploadImg" />
              <label htmlFor="file">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={e => setImage(e.target.files[0])}
                />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <div className="movieUpload">
              <img src={movie.imgTitle} alt="" className="movieUploadImg" />
              <label htmlFor="file">
                <input
                  type="file"
                  id="imageTitle"
                  name="imageTitle"
                  onChange={e => setImageTitle(e.target.files[0])}
                />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <div className="movieUpload">
              <img src={movie.imgSm} alt="" className="movieUploadImg" />
              <label htmlFor="file">
                <input
                  type="file"
                  id="imageSmall"
                  name="imageSmall"
                  onChange={e => setImageSmall(e.target.files[0])}
                />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <div className="submitButtons">
              <button className="addMovieButton" onClick={handleUpload}>
                Upload
              </button>
              <button className="addMovieButton" onClick={handleSubmit}>
                Update
              </button>
            </div>
            <div id="uploadProgress0"></div>
            <div id="uploadProgress1"></div>
            <div id="uploadProgress2"></div>
            <div id="uploadProgress3"></div>
            <div id="uploadProgress4"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Movie;
