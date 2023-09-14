"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

interface MovieCardProps {
  img: string;
  title: string;
  releaseDate: string;
  id: number;
  series?: boolean;
}

const MovieCard: FC<MovieCardProps> = ({
  img,
  releaseDate,
  title,
  id,
  series,
}) => {
  const router = useRouter();
  return (
    <div
      data-testid="movie-card"
      className="flex flex-col items-start gap-3 w-full"
    >
      <img
        data-testid="movie-poster"
        onClick={() => router.push(`/${series ? "series" : "movie"}/${id}`)}
        src={img}
        alt={title}
        className="relative h-auto w-full cursor-pointer object-cover"
      />
      <p data-testid="movie-title" className="text-[#111827] text-lg font-bold">
        {title}
      </p>
      <p
        data-testid="movie-release-date"
        className="text-[#111827] text-xs font-normal"
      >
        {releaseDate}
      </p>
    </div>
  );
};

export default MovieCard;
