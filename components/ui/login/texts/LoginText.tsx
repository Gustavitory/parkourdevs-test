import React from "react";

export const LoginText = () => {
  return (
    <div className="h-full w-full flex flex-col py-10 pt-20 px-5 items-center gap-3 text-center">
      <h1 className=" font-extrabold text-3xl">
        WEL<span className="text-secondaryColor">CO</span>ME
      </h1>
      <p className=" text-justify mt-5">
        {
          "Parkour team members solution can help you to manage a team members database, you can save all relevant information to speed up workflow."
        }
      </p>
    </div>
  );
};
