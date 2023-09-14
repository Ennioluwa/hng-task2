import { FC, useState } from "react";
import { IconType } from "react-icons";
import { usePathname, useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

interface NavButtonProps {
  Icon: IconType;
  label: string;
  href: string;
}

const NavButton: FC<NavButtonProps> = ({ label, Icon, href }) => {
  let pathname = usePathname();
  const router = useRouter();

  console.log(pathname, href);

  return (
    <button
      onClick={() => router.push(href)}
      className={`${
        poppins.className
      } flex text-xl font-semibold text-[#666] items-center w-full px-10 gap-3 py-4 ${
        pathname.includes(href.replace("ovies", "ovie")) &&
        href !== "/" &&
        "border-r-4 border-r-red-500 bg-[#BE123C1A] text-black "
      } hover:bg-[#BE123C1A] `}
    >
      <span
        className={`${
          pathname.includes(href.replace("ovies", "ovie")) &&
          href !== "/" &&
          " text-black"
        }`}
      >
        <Icon />
      </span>
      <span
        className={`${
          pathname.includes(href.replace("ovies", "ovie")) &&
          href !== "/" &&
          " text-red-500 "
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default NavButton;
