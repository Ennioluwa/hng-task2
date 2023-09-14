import Sidebar from "@/components/Sidebar";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  return (
    <div className=" h-full w-full overflow-x-hidden">
      <div className="hidden md:flex w-[226px] flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className=" md:pl-[226px] w-full h-full">{children}</main>
    </div>
  );
};

export default layout;