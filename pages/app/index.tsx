import { Logo } from "@/components/Logo";
import { List } from "@/components/ui/app/list";
import { SemicircleBackground } from "@/components/ui/backgroundItems/SemicircleBackgroundItem";
import React from "react";

const AppPage = () => {
  return (
    <div className="w-full h-screen bg-backgrounds-light">
      <SemicircleBackground />
      <div className="absolute z-50 top-0 left-0 w-full h-screen backdrop-blur-lg p-10">
        <div className="relative z-20 border-[1px] w-full h-full border-slate-200 flex flex-col items-center px-5 py-3 bg-white/80 rounded-md ">
          <Logo />
          <div className=" w-full h-full">
            <List />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
