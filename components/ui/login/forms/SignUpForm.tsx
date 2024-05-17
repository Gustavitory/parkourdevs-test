import { CreateAccount } from "@/lib/user/mutations";
import { ChevronLeft, LoaderPinwheel } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type TSignUpFormProps = {
  sectionController: (value: number) => void;
  shareCreatedUser: (email: string) => void;
};

export const SignUp = ({
  sectionController,
  shareCreatedUser,
}: TSignUpFormProps) => {
  const [isCreatingAccount, startTransition] = useTransition();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    const { email, password, rpassword, name } = Object.fromEntries(
      form.entries()
    ) as {
      email: string;
      password: string;
      rpassword: string;
      name: string;
    };
    if (email.length < 1 || password.length < 1 || rpassword.length < 1) {
      toast.error("All camps are required.");
      return;
    }
    if (password !== rpassword) {
      toast.error("Passwords don't match.");
      return;
    }
    startTransition(async () => {
      try {
        const { error, message } = await CreateAccount({
          email,
          password,
          name,
        });
        if (error) {
          throw new Error(message[0]);
        }
        shareCreatedUser(email);
        sectionController(2);
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center pb-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <section className="flex items-center gap-2">
            <ChevronLeft
              className="cursor-pointer hover:scale-110 duration-150 text-primaryHoverColor"
              onClick={() => sectionController(0)}
            />
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create an account
            </h2>
          </section>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="rpassword" className="sr-only">
                  Repeat password
                </label>
                <input
                  id="rpassword"
                  name="rpassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 px-2 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6 bg-white"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isCreatingAccount}
                className="mt-5 mb-5 flex w-full justify-center rounded-md bg-secondaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondaryColor/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isCreatingAccount ? (
                  <LoaderPinwheel className="w-6 h-6 text-white animate-spin" />
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
