import { AlertCircleIcon } from "lucide-react";
import React from "react";

type TErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: TErrorMessageProps) => {
  return (
    <div className="absolute z-40 w-full max-w-sm mx-auto py-1 px-2 bg-red-200 border border-red-400 rounded-md shadow-lg">
      <section className="flex items-center space-x-2">
        <AlertCircleIcon className="text-red-400" />
        <p className="text-sm">{message}</p>
      </section>
    </div>
  );
};
