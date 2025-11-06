import { useState } from "react";
import "./App.module.css";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie.ts";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSubmit = async (request: string) => {
    if (!request.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setMovies([]);

    try {
      const results = await fetchMovies(request);

      if (results.length === 0) {
        toast.error("No movies found.");
        return;
      }

      setMovies(results);
      console.log("Movies:", results);

    } catch (error) {
      toast.error("Request failed.");
      console.error(error);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <MovieGrid movies={movies} />
      <Toaster />
      
    </>
  );
}

export default App;
