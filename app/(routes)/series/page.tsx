import { Movie } from "@/app/page";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import axios from "axios";

const MoviesPage = async () => {
  const { data: movies } = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=d4c3f3ba31798ade4a6c41b6a29bef60`
  );
  return (
    <div className="">
      <div className="px-5 container max-w-7xl mx-auto xl:pt-20">
        <div className="flex justify-between items-center pt-[70px] mb-10">
          <h3 className=" font-bold text-2xl sm:text-4xl">Series</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center md:justify-items-between">
          {!movies.results.length && (
            <p className="text-4xl font-black py-40">No series found</p>
          )}
          {movies.results?.map((movie: any, id: number) => {
            return (
              <MovieCard
                series
                key={movie.id}
                title={movie.name}
                img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                releaseDate={movie.first_air_date}
                id={movie.id}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviesPage;
