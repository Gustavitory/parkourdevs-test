import React from "react";
import { LoginText } from "../texts/LoginText";
import AuthFormsHandler from "../forms";

export const LoginContentBox = () => {
  return (
    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] max-sm:w-[90%] bg-white text-black rounded-lg shadow-lg background-scale">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 md:grid-cols-2 max-w-3xl divide-x divide-backgrounds-light">
        <section className="py-1 px-2 block max-md:hidden">
          <LoginText />
        </section>
        <section className="py-1 px-2">
          <AuthFormsHandler />
        </section>
      </div>
    </div>
  );
};
