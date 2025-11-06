import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../../src/types/movie";

interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response: AxiosResponse<TMDBResponse> = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return response.data.results;
}
