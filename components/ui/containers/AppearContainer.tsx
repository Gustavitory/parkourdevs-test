"use client";
import { appearDelay } from "@/config/modals";
import { Transition } from "@headlessui/react";
import { PropsWithChildren, useEffect, useState } from "react";

export const AutoAppearContainer = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const openTimeout = setTimeout(() => setIsOpen(true), appearDelay);
    return () => {
      clearTimeout(openTimeout);
    };
  });
  return (
    <Transition appear show={isOpen}>
      {children}
    </Transition>
  );
};
