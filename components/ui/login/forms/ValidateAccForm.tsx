import { ValidateAccount } from "@/lib/user/mutations";
import { LoaderPinwheel } from "lucide-react";
import React, { useRef, useTransition } from "react";
import { toast } from "sonner";

type TValidateAccForm = {
  sectionController: (value: number) => void;
  createdUser: string;
};

export const ValidateAccForm = ({
  sectionController,
  createdUser,
}: TValidateAccForm) => {
  const [isValidating, startTransition] = useTransition();
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);
  const input4 = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const code = `${input1.current?.value || ""}${input2.current?.value || ""}${
      input3.current?.value || ""
    }${input4.current?.value || ""}`;
    if (code.length < 4) {
      toast.error("Invalid code");
      return;
    }
    startTransition(async () => {
      try {
        const { error, message } = await ValidateAccount({
          code,
          userEmail: createdUser,
        });
        if (error) {
          throw new Error(message[0]);
        }
        toast.success(
          "Your accound have been validated.\nNow you can sign in using your credentials."
        );
        sectionController(0);
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };
  return (
    <>
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Validate your account
      </h2>
      <p className="text-xs text-center">
        We have sent your validation code to your email.
      </p>
      <form onSubmit={handleSubmit} className=" h-full mt-5">
        <p className="text-xs text-center">Please enter your code</p>
        <div className="flex items-center gap-1 justify-center mt-1">
          <input
            type="text"
            placeholder="*"
            className="px-1 py-2 text-xl w-10 h-16 leading-none  text-center bg-white placeholder:text-slate-300 flex justify-center rounded-lg ring-1 ring-slate-300 focus:ring-primaryColor"
            maxLength={1}
            ref={input1}
            onChange={() => input2.current!.focus()}
          />
          <input
            type="text"
            placeholder="*"
            className="px-1 py-2 text-xl w-10 h-16 leading-none  text-center bg-white placeholder:text-slate-300 flex justify-center rounded-lg ring-1 ring-slate-300 focus:ring-primaryColor"
            maxLength={1}
            ref={input2}
            onChange={() => input3.current!.focus()}
          />
          <input
            type="text"
            placeholder="*"
            className="px-1 py-2 text-xl w-10 h-16 leading-none  text-center bg-white placeholder:text-slate-300 flex justify-center rounded-lg ring-1 ring-slate-300 focus:ring-primaryColor"
            maxLength={1}
            ref={input3}
            onChange={() => input4.current!.focus()}
          />
          <input
            type="text"
            placeholder="*"
            className="px-1 py-2 text-xl w-10 h-16 leading-none  text-center bg-white placeholder:text-slate-300 flex justify-center rounded-lg ring-1 ring-slate-300 focus:ring-primaryColor"
            maxLength={1}
            ref={input4}
          />
        </div>
        <button
          type="submit"
          disabled={isValidating}
          className="mt-10 flex w-full justify-center rounded-md bg-secondaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondaryColor/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isValidating ? (
            <LoaderPinwheel className="w-6 h-6 text-white animate-spin" />
          ) : (
            "Validate"
          )}
        </button>
      </form>
    </>
  );
};
