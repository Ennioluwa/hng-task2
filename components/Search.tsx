'use client'

import { AiOutlineSearch } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import axios from 'axios'
import qs from "query-string";

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [movies, setMovies] = useState([])


    const [value, setValue] = useState("");
    const debouncedValue = useDebounce<string>(value, 500);

    const getMovies = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=d4c3f3ba31798ade4a6c41b6a29bef60`
        );
        console.log(data);
        setMovies(data.results);
      };

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
      };

    useEffect(() => {
        const query = {
          name: debouncedValue,
        };
        // console.log(query);
        const url = qs.stringifyUrl(
            {
              url: window.location.href,
              query,
            },
            { skipEmptyString: true, skipNull: true }
          );
      
          console.log(url);
      
          router.push(url);
      }, [debouncedValue, router]);

  return (
    <div className="relative grow">
      <input
        type="text"
        placeholder="What do you want to watch?"
        onChange={onChange}
        className=" bg-transparent ring-2 ring-white rounded-md py-1.5 px-[10px] w-full grow text-xs"
      />
          <AiOutlineSearch className="h-5 w-5 absolute right-1 sm:right-[10px] top-0 bottom-0 my-auto " />
    
    </div>
  );
};

export default Search;
