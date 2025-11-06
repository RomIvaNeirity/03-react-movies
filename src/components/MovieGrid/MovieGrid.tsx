import css from './MovieGrid.module.css'
import type { Movie } from '../../types/movie'



interface MovieGridProps {
  movies: Movie[];
}


function MovieGrid({ movies }: MovieGridProps) {
    return (


        <ul className={css.grid}>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <div className={css.card}>
                        <img
                            className={css.image}
                            src="https://image.tmdb.org/t/p/w500/poster-path"
                            alt="movie title"
                            loading="lazy"
                        />
                        <h2 className={css.title}>{movie.title}</h2>
                    </div>
                </li>))}
        </ul>)
}

export default MovieGrid