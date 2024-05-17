import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["vietnamese"],
  display: "swap",
  weight: "700",
});

export const Logo = () => {
  return (
    <h1
      className={
        dancingScript.className +
        " " +
        "bg-gradient-to-r from-primaryColor to-secondaryColor inline-block text-transparent bg-clip-text text-5xl"
      }
    >
      Parkour
    </h1>
  );
};
