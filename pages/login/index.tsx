import { SemicircleBackground } from "@/components/ui/backgroundItems/SemicircleBackgroundItem";
import { LoginContentBox } from "@/components/ui/login/contentBox/LoginContentBox";
import React from "react";
import { Toaster } from "sonner";

const LoginPage = () => {
  return (
    <div className="w-full p-0 m-0 h-screen overflow-hidden bg-lightBg">
      <SemicircleBackground />
      <LoginContentBox />
      <Toaster position="top-center" expand={false} />
    </div>
  );
};
export default LoginPage;
