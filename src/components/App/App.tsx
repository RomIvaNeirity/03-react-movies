import { useState } from "react";
import "./App.module.css";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx'

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie.ts";
import Loader from "../Loader/Loader.tsx";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const handleSubmit = async (request: string) => {
    if (!request.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setMovies([]);
    setIsLoad(true)

    try {
      const results = await fetchMovies(request);

      if (results.length === 0) {
        toast.error("No movies found.");
        return;
      }

      setMovies(results);
      console.log("Movies:", results);

    } catch (error) {
     console.log(error)
     setError(true)
    }
    finally {setIsLoad(false)
      
}

  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <MovieGrid movies={movies} />
      {isError &&(
        <ErrorMessage />)}
      {isLoad && (<Loader />)}
      <Toaster />
      
    </>
  );
}

export default App;
