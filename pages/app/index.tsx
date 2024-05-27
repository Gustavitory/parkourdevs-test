"use client";
import { Logo } from "@/components/Logo";
import TeamMembersProvider from "@/components/ui/app/contexts/TeamMembersContext";
import { List } from "@/components/ui/app/list";
import { SemicircleBackground } from "@/components/ui/backgroundItems/SemicircleBackgroundItem";
import React from "react";
import { signOut } from "next-auth/react";
const AppPage = () => {
  return (
    <TeamMembersProvider>
      <div className="w-full h-screen bg-backgrounds-light">
        <SemicircleBackground />
        <div className="absolute z-50 top-0 left-0 w-full h-screen backdrop-blur-lg p-10">
          <div className="relative z-20 border-[1px] w-full h-full overflow-hidden border-slate-200 flex flex-col items-center px-5 py-3 bg-white/80 rounded-md ">
            <section className="flex items-center w-full justify-between px-5">
              <Logo />
              <button
                className="border-[1px] border-secondaryColor rounded-lg px-2 py-2 text-sm text-secondaryColor hover:bg-secondaryColor hover:text-white duration-150"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </section>
            <div className="w-full flex-1">
              <List />
            </div>
          </div>
        </div>
      </div>
    </TeamMembersProvider>
  );
};

export default AppPage;
