import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");


  // Connect App to API with Hook
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
    
    // Add Favorite Movie
    const addFav = (id) => {

      fetch(`https://be-myflix-9ae503e43319.herokuapp.com/users/${user.username}/movies/${id}`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then((response) => {
          if (response.ok) {
              return response.json();
          } else {
              alert("Failed to add");
          }
      }).then((user) => {
          if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              setUser(user);
          }
      }).catch(error => {
          console.error('Error: ', error);
      });
  };

  // Remove Favorite Movie
  const removeFav = (id) => {

      fetch(`https://be-myflix-9ae503e43319.herokuapp.com/users/${user.username}/movies/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then((response) => {
          if (response.ok) {
              return response.json();
          } else {
              alert("Failed to remove")
          }
      }).then((user) => {
          if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              setUser(user);
          }
      }).catch(error => {
          console.error('Error: ', error);
      });
  };

    return (
      <BrowserRouter>
        <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={setSearch}
        />

        <Row className="justify-content-md-center">
          {/* Return SignupView if not logged in, otherwise mainpage */}
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
  
              }
            />

            {/* Return LoginView if not logged in, otherwise mainpage */}
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView 
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
  
              }
            />

            {/* Return MovieView if logged in, otherwise LoginView */}
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView 
                        movies={movies}
                        removeFav={removeFav}
                        addFav={addFav}
                      />                     
                    </Col>                  
                  )}                 
                </>
              }
            />

            {/* Return MovieCards if logged in, otherwise LoginView */}
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list has no movies!</Col>
                  ) : (
                    <>
                      {movies.filter((movie) => {
                        return selectedGenre === ""
                        ? movie
                        : movie.Genre.Name === selectedGenre;
                      })
                      .filter((movie) => {
                        return search=== ""
                        ? movie
                        : movie.Title.toLowerCase().includes(search.toLowerCase());
                      })
                      .map((movie, movieId) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard 
                            movie={movie}
                            removeFav={removeFav}
                            addFav={addFav}
                            isFavorite={user.FavoriteMovies.includes(movie.id)}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            {/* Return ProfileView if logged in, otherwise LoginView */}
            <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      removeFav={removeFav}
                      addFav={addFav}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };