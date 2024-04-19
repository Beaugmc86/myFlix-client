//import PropTypes library
import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 card-shadow">
      <Card.Img 
        variant="top" 
        src={movie.ImagePath} onClick={() => onMovieClick(movie)} 
        style={{ cursor: "pointer" }}
      />
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
  onMovieClick: PropTypes.func.isRequired,
};