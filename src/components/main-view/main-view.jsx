import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import "./main-view.scss";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://be-myflix-9ae503e43319.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            Title: doc.Title,
            ImagePath: doc.ImagePath,
            Description: doc.Description,
            Genre: {
              Name: doc.Genre.Name
            },
            Director: {
              Name: doc.Director.Name
            },
            Featured: doc.Featured
          }
        });

        setMovies(moviesFromApi);
      });
    }, [token]);
    
    return (
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5} className="login-container">
            <LoginView 
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }} />
            or create an account
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView 
              movie={selectedMovie} 
              onBackClick={() => setSelectedMovie(null)} 
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            <Button 
              onClick={() => { 
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>

            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    );
  };