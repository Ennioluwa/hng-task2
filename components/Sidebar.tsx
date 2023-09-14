"use client";

import {
  AiOutlineHome,
  AiOutlineVideoCamera,
  AiOutlineMonitor,
  AiOutlineCalendar,
  AiOutlineLogout,
} from "react-icons/ai";
import Logo from "./Logo";
import NavButton from "./NavButton";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

const Sidebar = () => {
  const routes = [
    {
      label: "Home",
      Icon: AiOutlineHome,
      href: "/",
    },
    {
      label: "Movies",
      Icon: AiOutlineVideoCamera,
      href: "/movies",
    },
    {
      label: "TV Series",
      Icon: AiOutlineMonitor,
      href: "/series",
    },
    {
      label: "Upcoming",
      Icon: AiOutlineCalendar,
      href: "/upcoming",
    },
  ];
  return (
    <div className="w-[226px] bg-white h-screen overflow-hidden pt-[52px] border border-black/30 rounded-r-[45px] flex flex-col  ">
      <div className="px-4">
        <Logo black />
      </div>
      <div className="flex flex-col gap-3 mt-20">
        {routes.map((route, i) => (
          <NavButton key={i} {...route} />
        ))}
      </div>
      <button
        className={`${poppins.className} mt-auto mb-20 flex text-xl font-semibold text-[#666] items-center w-full px-10 gap-3 py-3 `}
      >
        <span>
          <AiOutlineLogout />
        </span>
        <span>Log out</span>
      </button>
    </div>
  );
};

export default Sidebar;
