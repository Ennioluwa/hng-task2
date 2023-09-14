import axios from "axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "500"], subsets: ["latin"] });

const MoviePage = async ({ params: { id } }: { params: { id: string } }) => {
  function formatThousands(num: number) {
    const thousands = Math.floor(num);
    return thousands.toFixed() + "k";
  }

  const { data: movie } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=d4c3f3ba31798ade4a6c41b6a29bef60`
  );

  const { data: castData } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=d4c3f3ba31798ade4a6c41b6a29bef60`
  );

  // Get the director
  function getDirector(cast: any) {
    const directors = cast.crew.filter(
      (member: any) => member.job === "Director"
    );

    directors.sort((a: any, b: any) => b.popularity - a.popularity);

    return directors.slice(0, 1);
  }

  // Get the writers
  function getWriters(cast: any) {
    const writers = cast.crew.filter(
      (member: any) => member.department === "Writing"
    );

    // Sort by popularity
    writers.sort((a: any, b: any) => b.popularity - a.popularity);

    // Return top 3
    const topWriters = writers.slice(0, 3).map((w: any) => w.name);

    return topWriters.join(", ");
  }

  // Get the stars
  function getStars(cast: any) {
    const stars = cast.cast.filter((member: any) => member.order < 10);

    // Sort by popularity
    stars.sort((a: any, b: any) => b.popularity - a.popularity);

    // Return top 3
    const topStars = stars.slice(0, 3).map((s: any) => s.name);

    return topStars.join(", ");
  }

  const director = getDirector(castData);
  const writers = getWriters(castData);
  const stars = getStars(castData);

  return (
    <div
      className={`${poppins.className} mx-auto container max-w-7xl xl:pt-20 p-5 flex flex-col gap-5`}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="movie"
        className=" h-auto w-full min-h-[400px] object-cover brightness-50 rounded-[20px]"
      />
      <div className="flex justify-between gap-x-10 gap-y-2 flex-wrap">
        <div className="flex flex-wrap gap-3 items-center text-[23px] font-medium text-[#404040] ">
          <h3 data-testid="movie-title">{movie.title}</h3>
          <span className=" h-[6px] w-[6px] bg-[#404040] rounded-full "></span>
          <p data-testid="movie-release-date">
            {new Date(movie.release_date).toUTCString()}
          </p>
          <span className=" h-[6px] w-[6px] bg-[#404040] rounded-full "></span>
          <p data-testid="movie-runtime">{movie.runtime} mins</p>
          <p className="flex gap-2 text-[#B91C1C] text-[15px] font-medium ">
            {movie.genres.map((genre: any) => (
              <span
                className=" px-[18px] py-1.5 rounded-3xl border border-[#F8E7EB] "
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </p>
        </div>
        <div className=" flex items-center gap-1">
          <img src="/Star.png" alt="star" className="h-5 w-5" />
          <span className=" text-[#E8E8E8]">
            {movie.vote_average.toFixed(1)}
          </span>
          <span className="">| {formatThousands(movie.popularity)}</span>
        </div>
      </div>

      <div className="flex text-[#333] text-[20px] flex-col gap-5 lg:flex-row ">
        <div className="flex flex-col gap-5 flex-[1.5]">
          <p data-testid="movie-overview">{movie.overview}</p>
          <p>
            Director :{"  "}
            <span className=" text-[#BE123C]">{director[0].name}</span>
          </p>
          <p>
            Writers : <span className=" text-[#BE123C]">{writers}</span>
          </p>
          <p>
            Stars : <span className=" text-[#BE123C]">{stars}</span>
          </p>
          <button className="bg-[#BE123C] rounded-[10px] text-white px-5 py-3 lg:self-start">
            Top rated movie
          </button>
        </div>
        <div className="flex-1 flex flex-col  gap-2">
          <button className="bg-[#BE123C] rounded-[10px] text-white self-stretch px-5 py-3 flex gap-1 items-center justify-center">
            <img src="/Tickets.png" alt="tickets" className="h-5 w-5" /> See
            Showtimes
          </button>
          <button className="bg-[#BE123C] bg-opacity-10 rounded-[10px] text-[#333] self-stretch px-5 py-3 flex gap-1 items-center justify-center">
            <img src="/List.png" alt="List" className="h-5 w-5" /> See More
            watch options
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
