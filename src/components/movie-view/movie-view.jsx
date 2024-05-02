import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";

export const MovieView = ({ movies, removeFav, addFav }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  // User
  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user);
  
  return (
    <>
      <Row className="my-5 justify-content-md-center">
        <Col md={5} className="col-12">
          <img 
            style={{maxWidth: '500px'}}
            src={movie.ImagePath} 
            alt={movie.Title} 
            className="mx-auto w-100 movie-image"
          />
        </Col>
        <Col md={7} className="col-12">
          <div className="my-1">
            <span className="h1">
              {movie.Title}
            </span>
          </div>
          <div className="my-1">
            <span className="h6">Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div className="my-1">
            <span className="h6">Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div className="my-1">
            <span className="h6">Description: </span>
            <span>{movie.Description}</span>
          </div>
          <Link to={`/`}>
            <button className="back-button">Back</button>
          </Link>
        </Col>
      </Row>
    </>
  );
};
