import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkStar, BookmarkStarFill } from "react-bootstrap-icons";
import "./movie-card.scss";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
  return (
    <Card className="h-100 card-shadow">
      <div>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Card.Img 
            variant="top" 
            src={movie.ImagePath} 
            style={{ cursor: "pointer" }}
          />
        </Link>
        <div>
          {isFavorite ? (
            <BookmarkStarFill size={40} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => removeFav(movie.id)}/>
          ) : (
            <BookmarkStar size={40} color="red" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => addFav(movie.id)}/>
          )}
        </div>
      </div>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

//define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Featured: PropTypes.bool
  }).isRequired,
};