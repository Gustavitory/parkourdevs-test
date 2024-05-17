"use client";
import { Logo } from "@/components/Logo";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { SignInForm } from "./LogInForm";
import { SignUp } from "./SignUpForm";
import { Transition, TransitionChild } from "@headlessui/react";
import { LoaderPinwheel } from "lucide-react";
import { ValidateAccForm } from "./ValidateAccForm";

const AuthFormsHandler = () => {
  const [position, setPosition] = useState<number>(0);
  const [width, setWidth] = useState<number>(435);
  const formsContainerRef = useRef<HTMLDivElement>(null);
  const [loadingView, setLoadingView] = useState<boolean>(true);
  const [createdUser, setCreatedUser] = useState<string>("");
  useEffect(() => {
    if (formsContainerRef.current) {
      const { clientWidth } = formsContainerRef.current;
      setWidth(clientWidth);
      const loadingViewCompleted = setTimeout(() => setLoadingView(false), 300);
      return () => {
        clearTimeout(loadingViewCompleted);
      };
    }
  }, [formsContainerRef]);

  const FullDimensionsSection = ({ children }: PropsWithChildren) => (
    <section className="h-full" style={{ width: `${width}px` }}>
      {children}
    </section>
  );

  return (
    <div ref={formsContainerRef} className="w-full h-full overflow-hidden ">
      <section className="mt-10 mb-5 flex justify-center">
        <Logo />
      </section>
      <div
        className="flex w-max transition-transform duration-300"
        style={{ transform: `translateX(-${width * position}px)` }}
      >
        <FullDimensionsSection>
          <SignInForm sectionController={setPosition} />
        </FullDimensionsSection>
        <FullDimensionsSection>
          <SignUp
            shareCreatedUser={setCreatedUser}
            sectionController={setPosition}
          />
        </FullDimensionsSection>
        <FullDimensionsSection>
          <ValidateAccForm
            sectionController={setPosition}
            createdUser={createdUser}
          />
        </FullDimensionsSection>
      </div>
      <Transition appear show={loadingView}>
        <TransitionChild
          leave="ease-in duration-200"
          leaveFrom="opacity-100 transform-[scale(100%)]"
          leaveTo="opacity-0 transform-[scale(95%)]"
        >
          <div className="w-full h-full rounded-lg bg-white absolute top-0 left-0 flex justify-center items-center">
            <LoaderPinwheel className="text-primaryHoverColor animate-spin w-10 h-10" />
          </div>
        </TransitionChild>
      </Transition>
    </div>
  );
};

export default AuthFormsHandler;
