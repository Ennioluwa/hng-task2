"use client";

import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { useEffect, useState, FC } from "react";
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const dm_sanss = DM_Sans({ subsets: ["latin"] });

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface RootPageProps {
  searchParams: {
    name: string;
  };
}

const Home: FC<RootPageProps> = ({ searchParams }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=d4c3f3ba31798ade4a6c41b6a29bef60`
    );
    console.log(data);
    setMovies(data.results);
  };

  const getMovieByName = async (name: string) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1&api_key=d4c3f3ba31798ade4a6c41b6a29bef60`
    );
    console.log(data);
    setMovies(data.results);
  };
  console.log(searchParams);

  useEffect(() => {
    searchParams.name ? getMovieByName(searchParams.name) : getMovies();
  }, [searchParams]);

  return (
    <div className={dm_sanss.className}>
      {/* {searchParams.name ? :} */}
      <div className=" min-h-[110px] h-auto bg-gray-600 relative text-white">
        {!searchParams.name && (
          <img
            src={`https://image.tmdb.org/t/p/original${movies[0]?.backdrop_path}`}
            alt="movie"
            className=" h-auto w-full min-h-[600px] object-cover brightness-50"
          />
        )}
        <div className="absolute inset-0 flex mt-5 flex-col h-full gap-5 font-medium px-5 sm:px-10  container mx-auto overflow-hidden">
          <Navbar />
          {!searchParams.name && (
            <div className="max-w-[400px] my-auto space-y-4">
              <h2 className=" font-bold text-4xl md:text-5xl">
                {movies[0]?.title}
              </h2>
              <h2 className=" text-sm grow">{movies[0]?.overview}</h2>
              <button className=" py-1.5 px-4 rounded-md bg-[#be123c] font-bold text-sm uppercase leading-6 flex  items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM9.5547 7.16795C9.24784 6.96338 8.8533 6.94431 8.52814 7.11833C8.20298 7.29235 8 7.63121 8 8V12C8 12.3688 8.20298 12.7077 8.52814 12.8817C8.8533 13.0557 9.24784 13.0366 9.5547 12.8321L12.5547 10.8321C12.8329 10.6466 13 10.3344 13 10C13 9.66565 12.8329 9.35342 12.5547 9.16795L9.5547 7.16795Z"
                    fill="white"
                  />
                </svg>
                WATCH TRAILER
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 sm:px-10 container mx-auto">
        <div className="flex justify-between items-center pt-[70px] mb-10">
          <h3 className=" font-bold text-2xl sm:text-4xl">
            {searchParams.name ? "Search Results" : "Featured Movie"}
          </h3>
          {!searchParams.name && (
            <button className=" sm:text-lg text-[#be123c] flex items-center gap-1 ">
              See More
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 4.66668L13.3333 10.5L7.5 16.3333"
                  stroke="#B91C1C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center md:justify-items-between">
          {!movies.length && (
            <p className="text-4xl font-black py-40">No movies found</p>
          )}
          {movies?.map((movie, id) => {
            if (id >= 10) return;
            return (
              <MovieCard
                key={movie.id}
                title={movie.original_title}
                img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                releaseDate={movie.release_date}
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

export default Home;
