import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setmovies] = useState([
    {
      id: 1,
      title: "Army of Darkness",
      image:
        "https://pics.filmaffinity.com/army_of_darkness_evil_dead_3_aka_the_evil_dead_3_army_of_darkness-862304484-large.jpg",
      director: "Sam Raimi",
      genre: "Horror",
      description: "A cult horror film directed by Sam Raimi, following a group of friends who encounter demonic forces while staying in a remote cabin in the woods, leading to a nightmarish fight for survival against possessed beings and ancient evil.",
    },
    {
      id: 2,
      title: "Batman",
      image:
        "https://pics.filmaffinity.com/batman-910896570-large.jpg",
      director: "Tim Burton",
      genre: "Action",
      description: "Tim Burton's gothic vision of the iconic comic book hero, where a brooding Bruce Wayne transforms into the masked vigilante Batman to protect Gotham City from the deranged criminal Joker, leading to a dark and atmospheric battle of good versus evil.",
    },
    {
      id: 3,
      title: "Alien",
      image:
        "https://pics.filmaffinity.com/alien-657278575-large.jpg",
      director: "Ridley Scott",
      genre: "Horror",
      description: "A science fiction horror film directed by Ridley Scott, where the crew of a commercial space tug encounters a deadly extraterrestrial creature onboard their ship, leading to a desperate battle for survival in the cold depths of space.",
    },
    
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};