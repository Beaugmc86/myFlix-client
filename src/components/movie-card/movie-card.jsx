//import PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img 
        variant="top" 
        src={movie.ImagePath} onClick={() => onMovieClick(movie)} 
        style={{ cursor: "pointer", width: "200px", height: "300px" }}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
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